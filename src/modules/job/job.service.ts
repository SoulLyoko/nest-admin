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
    private jobRepository: Repository<Job>
  ) {}

  findAll(findJobDto: FindJobDto) {
    return this.jobRepository.find(findJobDto);
  }

  findPage(pageJobDto: PageJobDto) {
    return findPage<Job>(this.jobRepository, pageJobDto);
  }

  findOne(id: number) {
    return this.jobRepository.findOne(id);
  }

  create(createJobDto: CreateJobDto) {
    return this.jobRepository.save(createJobDto);
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.jobRepository.update(id, updateJobDto);
  }

  remove(ids: string) {
    return this.jobRepository.delete(ids.split(','));
  }
}
