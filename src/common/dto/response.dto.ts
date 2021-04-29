import { ApiProperty } from '@nestjs/swagger';

/**
 * 响应对象
 */
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

/**
 * 分页数据对象
 */
export class pageDataDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  pageSize: number;

  list: any[];
}
