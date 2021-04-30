import { OmitType, PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { Job } from '../entities/job.entity';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateJobDto extends OmitType(Job, ['id']) {}

export class UpdateJobDto extends CreateJobDto {}

export class FindJobDto extends PartialType(PickType(Job, ['name'])) {}

export class PageJobDto extends IntersectionType(PageDto, FindJobDto) {}
