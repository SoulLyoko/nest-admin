import { Entity, Column } from 'typeorm';
import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonColmunEntity } from 'src/common/entities/common-column.entities';

@Entity()
export class Template extends CommonColmunEntity {
  @ApiProperty({ description: '名称' })
  @Column({ comment: '名称' })
  @Allow()
  name: string;
}
