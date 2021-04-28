import { Injectable } from '@nestjs/common';

@Injectable()
export class GenService {
  genCode(moduleName: string) {
    return moduleName;
  }
}
