import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 业务统一报错类
 */
export class Exception extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.OK);
  }
}
