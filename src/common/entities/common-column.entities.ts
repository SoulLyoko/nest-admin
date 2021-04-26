import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';

export class CommonColmunEntity {
  @ApiProperty({ description: '主键ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn({
    comment: '创建时间',
    type: 'datetime',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  })
  createTime: string;

  @ApiProperty({ description: '修改时间' })
  @UpdateDateColumn({
    comment: '修改时间',
    type: 'datetime',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  })
  updateTime: string;

  @ApiProperty({ description: '创建用户' })
  @Column({ comment: '创建用户', nullable: true })
  createBy: string;

  @ApiProperty({ description: '修改用户' })
  @Column({ comment: '修改用户', nullable: true })
  updateBy: string;
}
