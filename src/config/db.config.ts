import { registerAs } from '@nestjs/config';

const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SYNCHRONIZE, DB_LOGGING } = process.env;

export default registerAs('db', () => ({
  type: DB_TYPE,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: Boolean(DB_SYNCHRONIZE),
  logging: Boolean(DB_LOGGING)
}));
