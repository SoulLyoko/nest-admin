import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  success: boolean;

  data: any;
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
