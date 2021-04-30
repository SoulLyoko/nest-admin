import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { CreateJobDto, UpdateJobDto, FindJobDto, PageJobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { JobService } from './job.service';

@Controller('job')
@Class({ tag: '岗位管理', model: Job })
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @Handler({ tag: '获取全部数据', model: Job, resType: 'list' })
  findAll(@Query() findJobDto: FindJobDto) {
    return this.jobService.findAll(findJobDto);
  }

  @Get('page')
  @Handler({ tag: '获取分页数据', model: Job, resType: 'page' })
  findPage(@Query() pageJobDto: PageJobDto) {
    return this.jobService.findPage(pageJobDto);
  }

  @Get(':id')
  @Handler({ tag: '获取单条数据', model: Job })
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Post()
  @Handler({ tag: '新增数据' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Put(':id')
  @Handler({ tag: '更新数据' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':ids')
  @Handler({ tag: '删除数据' })
  remove(@Param('ids') ids: string) {
    return this.jobService.remove(ids);
  }
}
