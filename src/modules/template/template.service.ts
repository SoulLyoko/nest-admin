import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateDto, UpdateTemplateDto, FindTemplateDto, PageTemplateDto } from './dto/template.dto';
import { Template } from './entities/template.entity';
import { findPage } from 'src/utils';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>
  ) {}

  findAll(findTemplateDto: FindTemplateDto) {
    return this.templateRepository.find(findTemplateDto);
  }

  findPage(pageTemplateDto: PageTemplateDto) {
    return findPage<Template>(this.templateRepository, pageTemplateDto);
  }

  findOne(id: string) {
    return this.templateRepository.findOne(id);
  }

  create(createTemplateDto: CreateTemplateDto) {
    return this.templateRepository.save(createTemplateDto);
  }

  update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return this.templateRepository.update(id, updateTemplateDto);
  }

  remove(ids: string) {
    return this.templateRepository.delete(ids.split(','));
  }
}
