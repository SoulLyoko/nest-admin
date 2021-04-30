import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateDeptDto, UpdateDeptDto, FindDeptDto, PageDeptDto } from './dto/dept.dto';
import { Dept } from './entities/dept.entity';
import { findPage } from 'src/utils';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Dept)
    private deptRepository: TreeRepository<Dept>
  ) {}

  findTree() {
    return this.deptRepository.findTrees();
  }

  findAll(findDeptDto: FindDeptDto) {
    return this.deptRepository.find(findDeptDto);
  }

  findPage(pageDeptDto: PageDeptDto) {
    return findPage<Dept>(this.deptRepository, pageDeptDto);
  }

  findOne(id: number) {
    return this.deptRepository.findOne(id);
  }

  async create(createDeptDto: CreateDeptDto) {
    const parent = await this.findOne(createDeptDto.parentId);
    return this.deptRepository.save({ ...createDeptDto, parent: parent || null });
  }

  async update(id: number, updateDeptDto: UpdateDeptDto) {
    const parent = await this.findOne(updateDeptDto.parentId);
    return this.deptRepository.update(id, { ...updateDeptDto, parent: parent || null });
  }

  remove(ids: string) {
    return this.deptRepository.delete(ids.split(','));
  }
}
