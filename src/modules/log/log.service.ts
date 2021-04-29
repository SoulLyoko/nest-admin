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
    private repository: Repository<Log>
  ) {}

  findAll(findLogDto: FindLogDto) {
    return this.repository.find(findLogDto);
  }

  findPage(pageLogDto: PageLogDto) {
    return findPage<Log>(this.repository, pageLogDto);
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  create(createLogDto: CreateLogDto) {
    return this.repository.save(createLogDto);
  }

  update(id: string, updateLogDto: UpdateLogDto) {
    return this.repository.update(id, updateLogDto);
  }

  remove(ids: string) {
    return this.repository.delete(ids.split(','));
  }
}
