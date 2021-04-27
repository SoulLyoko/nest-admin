import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeParent, TreeChildren } from 'typeorm';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity('sys_dept')
@Tree('closure-table')
export class Dept extends CommonColmunEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '上级id' })
  parentId: number;

  @Column({ comment: '部门名称' })
  name: string;

  @Column({ comment: '排序', nullable: true, default: 0 })
  sort: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @TreeParent()
  parent: Dept;

  @TreeChildren()
  children: Dept[];
}
