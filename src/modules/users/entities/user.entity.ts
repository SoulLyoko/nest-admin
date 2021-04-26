import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany
} from 'typeorm';
import { Allow, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';
import { Dept } from 'src/modules/depts/entities/dept.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Job } from 'src/modules/jobs/entities/job.entity';
import { GenderEnum } from 'src/common/enums/gender.enum';

@Entity('sys_user')
export class User extends CommonColmunEntity {
  @ApiProperty({ description: '用户名' })
  @Column({ comment: '用户名' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ comment: '密码' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '昵称' })
  @Column({ comment: '昵称', nullable: true })
  @Allow()
  nickName?: string;

  @ApiProperty({ description: '性别', enum: GenderEnum })
  @Column({ comment: '性别', nullable: true, enum: GenderEnum })
  @Allow()
  sex?: string;

  @ApiProperty({ description: '电话' })
  @Column({ comment: '电话', nullable: true })
  @Allow()
  phone?: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ comment: '邮箱', nullable: true })
  @Allow()
  email?: string;

  @ApiProperty({ description: '头像' })
  @Column({ comment: '头像', nullable: true })
  @Allow()
  avatar?: string;

  @ApiProperty({ description: '备注' })
  @Column({ comment: '备注', nullable: true })
  @Allow()
  remark?: string;

  @ApiProperty({ description: '部门id', default: null })
  @Column({ comment: '部门id', nullable: true })
  @Allow()
  deptId?: Dept['id'];

  @ApiProperty({ description: '岗位id', default: null })
  @Column({ comment: '岗位id', nullable: true })
  @Allow()
  jobId?: Job['id'];

  @ApiProperty({ description: '角色ids', default: [] })
  @Allow()
  roleIds?: Role['id'][];

  @ApiProperty({ type: Dept })
  @OneToOne(() => Dept)
  @JoinColumn()
  dept: Dept;

  @ApiProperty({ type: Job })
  @OneToOne(() => Job)
  @JoinColumn()
  job: Job;

  @ApiProperty({ description: '角色' })
  @ManyToMany(() => Role)
  @JoinTable({ name: 'sys_user_roles' })
  roles: Role[];
}
