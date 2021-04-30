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
    private roleRepository: Repository<Role>
  ) {}

  findAll(findRoleDto: FindRoleDto) {
    return this.roleRepository.find(findRoleDto);
  }

  findPage(pageRoleDto: PageRoleDto) {
    return findPage<Role>(this.roleRepository, pageRoleDto);
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id);
  }

  findByCode(code: string) {
    return this.roleRepository.findOne({ code });
  }

  findByIds(ids: number[]) {
    return this.roleRepository.find({ id: In(ids) });
  }

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.findByCode(createRoleDto.code);
    if (role) {
      throw new Exception('已存在相同的角色标识');
    }
    return this.roleRepository.save(createRoleDto);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(ids: string) {
    return this.roleRepository.delete(ids.split(','));
  }
}
