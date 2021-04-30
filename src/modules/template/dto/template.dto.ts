import { OmitType, PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { Template } from '../entities/template.entity';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateTemplateDto extends OmitType(Template, ['id']) {}

export class UpdateTemplateDto extends CreateTemplateDto {}

export class FindTemplateDto extends PartialType(PickType(Template, ['name'])) {}

export class PageTemplateDto extends IntersectionType(PageDto, FindTemplateDto) {}
