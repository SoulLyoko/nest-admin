import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiBearerAuth
} from '@nestjs/swagger';
import { ApiResponseSuccess } from 'src/common/decorators/api-response.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { PageUserDto } from './dto/page-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('Users 用户管理')
@ApiExtraModels(User)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取全部数据' })
  @ApiResponseSuccess(User, 'list')
  @ApiBearerAuth()
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @Get('/page')
  @ApiOperation({ summary: '获取分页数据' })
  @ApiResponseSuccess(User, 'page')
  findPage(@Query() pageUserDto: PageUserDto) {
    return this.usersService.findPage(pageUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单条数据' })
  @ApiResponseSuccess(User)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: '新增数据' })
  @ApiResponseSuccess()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新数据' })
  @ApiResponseSuccess()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据' })
  @ApiResponseSuccess()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
