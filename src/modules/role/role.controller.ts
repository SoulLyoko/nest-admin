import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { CreateRoleDto, UpdateRoleDto, FindRoleDto, PageRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('role')
@Class({ tag: '角色管理', model: Role })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Handler({ tag: '获取全部数据', model: Role, resType: 'list' })
  findAll(@Query() findRoleDto: FindRoleDto) {
    return this.roleService.findAll(findRoleDto);
  }

  @Get('page')
  @Handler({ tag: '获取分页数据', model: Role, resType: 'page' })
  findPage(@Query() pageRoleDto: PageRoleDto) {
    return this.roleService.findPage(pageRoleDto);
  }

  @Get(':id')
  @Handler({ tag: '获取单条数据', model: Role })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Post()
  @Handler({ tag: '新增数据' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Put(':id')
  @Handler({ tag: '更新数据' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':ids')
  @Handler({ tag: '删除数据' })
  remove(@Param('ids') ids: string) {
    return this.roleService.remove(ids);
  }
}
