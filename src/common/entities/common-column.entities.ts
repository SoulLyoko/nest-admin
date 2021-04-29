import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { formatDate } from 'src/utils';

/**
 * 公共列实体
 */
export class CommonColmunEntity {
  @ApiProperty({ description: '主键ID' })
  @PrimaryGeneratedColumn()
  id: string;

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
  createAt?: string;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn({
    comment: '更新时间',
    type: 'datetime',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => formatDate(value)
    }
  })
  updateAt?: string;
}
