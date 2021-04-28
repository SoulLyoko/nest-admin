import { registerAs } from '@nestjs/config';

const { APP_PORT, APP_PREFIX, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export default registerAs('app', () => ({
  port: parseInt(APP_PORT),
  prefix: APP_PREFIX,
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRES_IN
}));
