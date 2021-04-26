import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { PageUserDto } from './dto/page-user.dto';
import { simpleCrud, Like } from 'src/utils/crud';

@Injectable()
export class UsersService extends simpleCrud<User> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  where(dto: FindUserDto) {
    return {
      ...dto,
      username: Like(dto.username),
      nickName: Like(dto.nickName)
    };
  }

  findAll(findUserDto: FindUserDto) {
    return this._findAll(this.where(findUserDto));
  }

  findPage(pageUserDto: PageUserDto) {
    return this._findPage(pageUserDto, {
      relations: ['dept', 'roles', 'job']
    });
  }

  findOne(optionsOrId: FindOneOptions | number) {
    return this._findOne(optionsOrId);
  }

  create(createUserDto: CreateUserDto) {
    return this._save(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.roleIds;
    return this._update(id, updateUserDto);
  }

  remove(id: number) {
    return this._delete(id);
  }
}
