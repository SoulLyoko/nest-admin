import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  msg: string;

  data?: T | T[];
}

export class pageDataDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  pageSize: number;

  list: any[];
}
