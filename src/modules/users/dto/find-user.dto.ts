import { PickType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindUserDto extends PartialType(
  PickType(User, ['username', 'nickName', 'deptId', 'jobId', 'sex'])
) {}
