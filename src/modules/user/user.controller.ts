import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, FindUserDto, PageUserDto } from './dto/user.dto';

@Controller('user')
@Class({ tag: '用户管理', model: User, isAuth: false })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Handler({ tag: '获取全部数据', model: User, resType: 'list' })
  findAll(@Query() findUserDto: FindUserDto) {
    return this.userService.findAll(findUserDto);
  }

  @Get('page')
  @Handler({ tag: '获取分页数据', model: User, resType: 'page' })
  findPage(@Query() pageUserDto: PageUserDto) {
    return this.userService.findPage(pageUserDto);
  }

  @Get(':id')
  @Handler({ tag: '获取单条数据', model: User })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  @Handler({ tag: '新增数据' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @Handler({ tag: '更新数据' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':ids')
  @Handler({ tag: '删除数据' })
  remove(@Param('ids') ids: string) {
    return this.userService.remove(ids);
  }
}
