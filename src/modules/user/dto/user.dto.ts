import { OmitType, PickType, PartialType, IntersectionType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateUserDto extends OmitType(User, ['id', 'dept', 'job', 'roles']) {}

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {}

export class FindUserDto extends PartialType(PickType(User, ['username', 'nickName', 'deptId', 'jobId', 'sex'])) {}

export class PageUserDto extends IntersectionType(PageDto, FindUserDto) {}
