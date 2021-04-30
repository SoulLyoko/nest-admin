import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, FindUserDto, PageUserDto } from './dto/user.dto';
import { findPage, ormLike, Exception } from 'src/utils';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService
  ) {}

  where(findUserDto: FindUserDto) {
    return {
      ...findUserDto,
      username: ormLike(findUserDto.username),
      nickName: ormLike(findUserDto.nickName)
    };
  }

  findAll(findUserDto: FindUserDto) {
    return this.userRepository.find(this.where(findUserDto));
  }

  findPage(pageUserDto: PageUserDto) {
    return findPage<User>(this.userRepository, pageUserDto, {
      relations: ['dept', 'roles', 'job']
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByName(username: string) {
    return this.userRepository.findOne({ username });
  }

  async create(createUserDto: CreateUserDto) {
    const roleIds = this.transformRoleIds(createUserDto.roleIds);
    const user = await this.findByName(createUserDto.username);
    if (user) {
      throw new Exception('已存在相同的用户名');
    }
    const roles = await this.roleService.findByIds(roleIds);
    delete createUserDto.roleIds;
    return this.userRepository.save({ ...createUserDto, roles });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const roleIds = this.transformRoleIds(updateUserDto.roleIds);
    const roles = await this.roleService.findByIds(roleIds);
    delete updateUserDto.roleIds;
    return this.userRepository.update(id, { ...updateUserDto, roles });
  }

  remove(ids: string) {
    return this.userRepository.delete(ids.split(','));
  }

  transformRoleIds(roleIds: number[] | string[]) {
    return (roleIds + '').split(',').map((roleId) => parseInt(roleId));
  }
}
