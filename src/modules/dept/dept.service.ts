import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeptDto, UpdateDeptDto, FindDeptDto, PageDeptDto } from './dto/dept.dto';
import { Dept } from './entities/dept.entity';
import { findPage } from 'src/utils';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private repository: Repository<Dept>
  ) {}

  findAll(findDeptDto: FindDeptDto) {
    return this.repository.find(findDeptDto);
  }

  findPage(pageDeptDto: PageDeptDto) {
    return findPage<Dept>(this.repository, pageDeptDto);
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  create(createDeptDto: CreateDeptDto) {
    return this.repository.save(createDeptDto);
  }

  update(id: string, updateDeptDto: UpdateDeptDto) {
    return this.repository.update(id, updateDeptDto);
  }

  remove(ids: string) {
    return this.repository.delete(ids.split(','));
  }
}
