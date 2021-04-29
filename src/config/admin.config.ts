import { registerAs } from '@nestjs/config';

/**
 * 默认的管理员用户和角色配置
 */
export default registerAs('admin', () => ({
  username: 'admin',
  password: '123456',
  nickName: '管理员',
  roleName: '超级管理员',
  roleCode: 'ROLE_SUPER'
}));
