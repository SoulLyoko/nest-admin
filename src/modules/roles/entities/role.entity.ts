import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity('sys_role')
export class Role extends CommonColmunEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ comment: '角色标识' })
  code: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
}
