import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, FindUserDto, PageUserDto } from './dto/user.dto';
import { findPage, ormLike, Exception } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
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
    const user = await this.findByName(createUserDto.username);
    if (user) {
      throw new Exception('已存在相同的用户名');
    }
    return this.userRepository.save(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.roleIds;
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
