import { Entity, Column } from 'typeorm';
import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';
import { StatusEnum } from 'src/common/enums/status.enum';

@Entity('sys_log')
export class Log extends CommonColmunEntity {
  @ApiProperty({ description: '操作名称' })
  @Column({ comment: '操作名称', nullable: true })
  @Allow()
  name?: string;

  @ApiProperty({ description: '响应状态', enum: StatusEnum })
  @Column({ comment: '响应状态', nullable: true })
  @Allow()
  status?: string;

  @ApiProperty({ description: '请求方式' })
  @Column({ comment: '请求方式', nullable: true })
  @Allow()
  method?: string;

  @ApiProperty({ description: '请求地址' })
  @Column({ comment: '请求地址', nullable: true })
  @Allow()
  url?: string;

  @ApiProperty({ description: '请求参数' })
  @Column({ comment: '请求参数', nullable: true, length: 1024 })
  @Allow()
  params?: string;

  @ApiProperty({ description: '返回信息' })
  @Column({ comment: '返回信息', nullable: true })
  @Allow()
  message?: string;

  @ApiProperty({ description: 'IP' })
  @Column({ comment: 'IP', nullable: true })
  @Allow()
  ip?: string;

  @ApiProperty({ description: '客户端信息' })
  @Column({ comment: '客户端信息', nullable: true, length: 1024 })
  @Allow()
  userAgent?: string;

  @ApiProperty({ description: '请求耗时' })
  @Column({ comment: '请求耗时', nullable: true })
  @Allow()
  time?: string;

  @ApiProperty({ description: '操作用户' })
  @Column({ comment: '操作用户', nullable: true })
  @Allow()
  username?: string;
}
