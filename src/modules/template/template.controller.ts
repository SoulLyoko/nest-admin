import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query
} from '@nestjs/common';
import { ApiTags, ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { ApiResponseSuccess } from 'src/common/decorators/api-response.decorator';
import { Template } from './entities/template.entity';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { FindTemplateDto } from './dto/find-template.dto';
import { PageTemplateDto } from './dto/page-template.dto';

@ApiTags('Template')
@Controller('template')
@ApiExtraModels(Template)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @ApiOperation({ summary: '获取全部数据' })
  @ApiResponseSuccess(Template, 'list')
  findAll(@Query() findTemplateDto: FindTemplateDto) {
    return this.templateService.findAll(findTemplateDto);
  }

  @Get('/page')
  @ApiOperation({ summary: '获取分页数据' })
  @ApiResponseSuccess(Template, 'page')
  findPage(@Query() pageTemplateDto: PageTemplateDto) {
    return this.templateService.findPage(pageTemplateDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单条数据' })
  @ApiResponseSuccess(Template)
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: '新增数据' })
  @ApiResponseSuccess()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新数据' })
  @ApiResponseSuccess()
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return this.templateService.update(+id, updateTemplateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据' })
  @ApiResponseSuccess()
  remove(@Param('id') id: string) {
    return this.templateService.remove(+id);
  }
}
