import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { FindTemplateDto } from './dto/find-template.dto';
import { PageTemplateDto } from './dto/page-template.dto';
import { simpleCrud } from 'src/utils/crud';

@Injectable()
export class TemplateService extends simpleCrud<Template> {
  constructor(
    @InjectRepository(Template)
    templateRepository: Repository<Template>
  ) {
    super(templateRepository);
  }

  findAll(findTemplateDto: FindTemplateDto) {
    return this._findAll(findTemplateDto);
  }

  findPage(pageTemplateDto: PageTemplateDto) {
    return this._findPage(pageTemplateDto, {
      relations: ['dept', 'roles', 'job']
    });
  }

  findOne(id: number) {
    return this._findOne(id);
  }

  create(createTemplateDto: CreateTemplateDto) {
    return this._save(createTemplateDto);
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this._update(id, updateTemplateDto);
  }

  remove(id: number) {
    return this._delete(id);
  }
}
