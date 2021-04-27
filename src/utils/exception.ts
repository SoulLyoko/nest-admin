import { HttpException, HttpStatus } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.OK);
  }
}
