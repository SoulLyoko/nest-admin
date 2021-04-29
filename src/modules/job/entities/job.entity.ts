import { Entity, Column } from 'typeorm';
import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity('sys_job')
export class Job extends CommonColmunEntity {
  @ApiProperty({ description: '岗位名称' })
  @Column({ comment: '岗位名称', nullable: true })
  @Allow()
  name?: string;

  @ApiProperty({ description: '备注' })
  @Column({ comment: '备注', nullable: true })
  @Allow()
  remark?: string;
}
