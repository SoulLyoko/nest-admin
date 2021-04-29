import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';

@Injectable()
export class InitDbService {
  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private configService: ConfigService
  ) {}

  async onModuleInit() {
    await this.initRole();
    await this.initUser();
  }

  /**
   * 初始化管理员角色
   */
  async initRole() {
    const { roleName, roleCode } = this.configService.get('admin');
    const isExist = await this.roleService.findByCode(roleCode);
    if (!isExist) {
      await this.roleService.create({ name: roleName, code: roleCode });
    }
  }

  /**
   * 初始化管理员用户
   */
  async initUser() {
    const { username, password, nickName, roleCode } = this.configService.get('admin');
    const isExist = await this.userService.findByName(username);
    if (!isExist) {
      const role = await this.roleService.findByCode(roleCode);
      await this.userService.create({ username, password, nickName, roleIds: role.id });
    }
  }
}
