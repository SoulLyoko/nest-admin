import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto, UpdateTemplateDto, FindTemplateDto, PageTemplateDto } from './dto/template.dto';
import { findPage } from 'src/utils';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private repository: Repository<Template>
  ) {}

  findAll(findTemplateDto: FindTemplateDto) {
    return this.repository.find(findTemplateDto);
  }

  findPage(pageTemplateDto: PageTemplateDto) {
    return findPage<Template>(this.repository, pageTemplateDto);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  create(createTemplateDto: CreateTemplateDto) {
    return this.repository.save(createTemplateDto);
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.repository.update(id, updateTemplateDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
