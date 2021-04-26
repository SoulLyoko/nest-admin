import { PickType, PartialType } from '@nestjs/swagger';
import { Template } from '../entities/template.entity';

export class FindTemplateDto extends PartialType(
  PickType(Template, ['name'])
) {}
