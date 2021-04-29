import { registerAs } from '@nestjs/config';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

/**
 * JWT配置
 */
export default registerAs('jwt', () => ({
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRES_IN
}));
