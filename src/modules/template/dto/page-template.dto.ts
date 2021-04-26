import { IntersectionType } from '@nestjs/swagger';
import { FindTemplateDto } from './find-template.dto';
import { PageDto } from 'src/common/dto/page.dto';

export class PageTemplateDto extends IntersectionType(
  PageDto,
  FindTemplateDto
) {}
