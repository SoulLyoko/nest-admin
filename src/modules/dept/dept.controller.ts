import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { CreateDeptDto, UpdateDeptDto, FindDeptDto, PageDeptDto } from './dto/dept.dto';
import { Dept } from './entities/dept.entity';
import { DeptService } from './dept.service';

@Controller('dept')
@Class({ tag: '部门管理', model: Dept, isAuth: false })
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get('tree')
  @Handler({ tag: '获取树', model: Dept })
  findTree() {
    return this.deptService.findTree();
  }

  @Get()
  @Handler({ tag: '获取全部数据', model: Dept, resType: 'list' })
  findAll(@Query() findDeptDto: FindDeptDto) {
    return this.deptService.findAll(findDeptDto);
  }

  @Get('page')
  @Handler({ tag: '获取分页数据', model: Dept, resType: 'page' })
  findPage(@Query() pageDeptDto: PageDeptDto) {
    return this.deptService.findPage(pageDeptDto);
  }

  @Get(':id')
  @Handler({ tag: '获取单条数据', model: Dept })
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @Post()
  @Handler({ tag: '新增数据' })
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Put(':id')
  @Handler({ tag: '更新数据' })
  update(@Param('id') id: string, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(+id, updateDeptDto);
  }

  @Delete(':ids')
  @Handler({ tag: '删除数据' })
  remove(@Param('ids') ids: string) {
    return this.deptService.remove(ids);
  }
}
