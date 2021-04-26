import { OmitType } from '@nestjs/swagger';
import { Template } from '../entities/template.entity';

export class CreateTemplateDto extends OmitType(Template, ['id']) {}
