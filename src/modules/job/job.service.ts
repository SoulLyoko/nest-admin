import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto, UpdateJobDto, FindJobDto, PageJobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { findPage } from 'src/utils';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private repository: Repository<Job>
  ) {}

  findAll(findJobDto: FindJobDto) {
    return this.repository.find(findJobDto);
  }

  findPage(pageJobDto: PageJobDto) {
    return findPage<Job>(this.repository, pageJobDto);
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  create(createJobDto: CreateJobDto) {
    return this.repository.save(createJobDto);
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.repository.update(id, updateJobDto);
  }

  remove(ids: string) {
    return this.repository.delete(ids.split(','));
  }
}
