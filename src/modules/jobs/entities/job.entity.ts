import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity('sys_job')
export class Job extends CommonColmunEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '岗位名称' })
  name: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
}
