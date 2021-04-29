import { registerAs } from '@nestjs/config';

const {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_SYNCHRONIZE,
  DB_LOGGING,
  NODE_ENV
} = process.env;

/**
 * 数据库配置
 */
export default registerAs('db', () => ({
  type: DB_TYPE,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: NODE_ENV === 'development' ? DB_SYNCHRONIZE === 'true' : false,
  logging: DB_LOGGING === 'true'
}));
