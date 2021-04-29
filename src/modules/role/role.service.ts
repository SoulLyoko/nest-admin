import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto, FindRoleDto, PageRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { Exception, findPage } from 'src/utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>
  ) {}

  findAll(findRoleDto: FindRoleDto) {
    return this.repository.find(findRoleDto);
  }

  findPage(pageRoleDto: PageRoleDto) {
    return findPage<Role>(this.repository, pageRoleDto);
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  findByCode(code: string) {
    return this.repository.findOne({ code });
  }

  findByIds(ids: string) {
    return this.repository.find({ id: In(ids ? (ids + '').split(',') : []) });
  }

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.findByCode(createRoleDto.code);
    if (role) {
      throw new Exception('已存在相同的角色标识');
    }
    return this.repository.save(createRoleDto);
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.repository.update(id, updateRoleDto);
  }

  remove(ids: string) {
    return this.repository.delete(ids.split(','));
  }
}
