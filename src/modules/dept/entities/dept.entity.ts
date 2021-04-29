import { Entity, Column, TreeParent, TreeChildren, Tree } from 'typeorm';
import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity('sys_dept')
@Tree('closure-table')
export class Dept extends CommonColmunEntity {
  @ApiProperty({ description: '上级ID' })
  @Column({ comment: '上级ID', default: 0 })
  parentId: number;

  @ApiProperty({ description: '部门名称' })
  @Column({ comment: '部门名称', nullable: true })
  @Allow()
  name?: string;

  @ApiProperty({ description: '排序' })
  @Column({ comment: '排序', nullable: true, default: 0 })
  @Allow()
  sort?: number;

  @ApiProperty({ description: '备注' })
  @Column({ comment: '备注', nullable: true })
  @Allow()
  remark?: string;

  @TreeParent()
  parent: Dept;

  @TreeChildren()
  children: Dept[];
}
