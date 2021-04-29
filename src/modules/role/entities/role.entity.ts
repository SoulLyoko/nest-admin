import { Entity, Column } from 'typeorm';
import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity('sys_role')
export class Role extends CommonColmunEntity {
  @ApiProperty({ description: '角色名称' })
  @Column({ comment: '角色名称' })
  @Allow()
  name?: string;

  @ApiProperty({ description: '角色标识' })
  @Column({ comment: '角色标识', unique: true })
  @Allow()
  code: string;

  @ApiProperty({ description: '备注' })
  @Column({ comment: '备注', nullable: true })
  @Allow()
  remark?: string;
}
