import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { CreateLogDto, UpdateLogDto, FindLogDto, PageLogDto } from './dto/log.dto';
import { findPage } from 'src/utils';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>
  ) {}

  findAll(findLogDto: FindLogDto) {
    return this.logRepository.find(findLogDto);
  }

  findPage(pageLogDto: PageLogDto) {
    return findPage<Log>(this.logRepository, pageLogDto);
  }

  findOne(id: number) {
    return this.logRepository.findOne(id);
  }

  create(createLogDto: CreateLogDto) {
    return this.logRepository.save(createLogDto);
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return this.logRepository.update(id, updateLogDto);
  }

  remove(ids: string) {
    return this.logRepository.delete(ids.split(','));
  }
}
