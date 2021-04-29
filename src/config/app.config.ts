import { registerAs } from '@nestjs/config';

const { APP_PORT, APP_PREFIX } = process.env;

/**
 * 应用基础配置
 */
export default registerAs('app', () => ({
  port: parseInt(APP_PORT),
  prefix: APP_PREFIX
}));
