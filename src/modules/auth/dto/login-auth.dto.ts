import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  username: string;

  @Allow()
  @IsNotEmpty()
  password: string;
}
