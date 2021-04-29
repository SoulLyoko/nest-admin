import { OmitType, PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { Dept } from '../entities/dept.entity';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateDeptDto extends OmitType(Dept, ['id']) {}

export class UpdateDeptDto extends OmitType(CreateDeptDto, []) {}

export class FindDeptDto extends PartialType(PickType(Dept, ['name'])) {}

export class PageDeptDto extends IntersectionType(PageDto, FindDeptDto) {}
