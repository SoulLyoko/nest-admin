import { OmitType, PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateRoleDto extends OmitType(Role, ['id']) {}

export class UpdateRoleDto extends OmitType(CreateRoleDto, []) {}

export class FindRoleDto extends PartialType(PickType(Role, ['name'])) {}

export class PageRoleDto extends IntersectionType(PageDto, FindRoleDto) {}
