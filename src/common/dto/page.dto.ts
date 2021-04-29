import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

/**
 * 分页查询对象
 */
export class PageDto {
  @Allow()
  @ApiProperty({ description: '页数', default: 1 })
  pageNumber: number;

  @Allow()
  @ApiProperty({ description: '每页条数', default: 10 })
  pageSize: number;
}
