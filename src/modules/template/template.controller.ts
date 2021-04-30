import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { CreateTemplateDto, UpdateTemplateDto, FindTemplateDto, PageTemplateDto } from './dto/template.dto';
import { Template } from './entities/template.entity';
import { TemplateService } from './template.service';

@Controller('template')
@Class({ tag: 'template', model: Template })
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @Handler({ tag: '获取全部数据', model: Template, resType: 'list' })
  findAll(@Query() findTemplateDto: FindTemplateDto) {
    return this.templateService.findAll(findTemplateDto);
  }

  @Get('page')
  @Handler({ tag: '获取分页数据', model: Template, resType: 'page' })
  findPage(@Query() pageTemplateDto: PageTemplateDto) {
    return this.templateService.findPage(pageTemplateDto);
  }

  @Get(':id')
  @Handler({ tag: '获取单条数据', model: Template })
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(+id);
  }

  @Post()
  @Handler({ tag: '新增数据' })
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Put(':id')
  @Handler({ tag: '更新数据' })
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete(':ids')
  @Handler({ tag: '删除数据' })
  remove(@Param('ids') ids: string) {
    return this.templateService.remove(ids);
  }
}
