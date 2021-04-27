import { BeforeInsert, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { formatDate } from 'src/utils';

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
      from: (value) => formatDate(value)
    }
  })
  createAt: string;

  @ApiProperty({ description: '修改时间' })
  @UpdateDateColumn({
    comment: '修改时间',
    type: 'datetime',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => formatDate(value)
    }
  })
  updateAt: string;

  @ApiProperty({ description: '创建用户' })
  @Column({
    comment: '创建用户',
    nullable: true,
    transformer: {
      to: (value) => 'admin',
      from: (value) => value
    }
  })
  createBy: string;

  @ApiProperty({ description: '修改用户' })
  @Column({
    comment: '修改用户',
    nullable: true,
    transformer: {
      to: (value) => 'admin',
      from: (value) => value
    }
  })
  updateBy: string;
}
