import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { CreateLogDto, UpdateLogDto, FindLogDto, PageLogDto } from './dto/log.dto';
import { Log } from './entities/log.entity';
import { LogService } from './log.service';

@Controller('log')
@Class({ tag: '系统日志', model: Log })
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @Handler({ tag: '获取全部数据', model: Log, resType: 'list' })
  findAll(@Query() findLogDto: FindLogDto) {
    return this.logService.findAll(findLogDto);
  }

  @Get('/page')
  @Handler({ tag: '获取分页数据', model: Log, resType: 'page' })
  findPage(@Query() pageLogDto: PageLogDto) {
    return this.logService.findPage(pageLogDto);
  }

  @Get(':id')
  @Handler({ tag: '获取单条数据', model: Log })
  findOne(@Param('id') id: string) {
    return this.logService.findOne(id);
  }

  @Post()
  @Handler({ tag: '新增数据' })
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Put(':id')
  @Handler({ tag: '更新数据' })
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(id, updateLogDto);
  }

  @Delete(':ids')
  @Handler({ tag: '删除数据' })
  remove(@Param('ids') ids: string) {
    return this.logService.remove(ids);
  }
}
