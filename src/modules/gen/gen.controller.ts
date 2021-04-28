import { Controller, Post, Param } from '@nestjs/common';
import { Class, Handler } from 'src/common/decorators/controller.decorator';
import { GenService } from './gen.service';

@Controller('gen')
@Class({ tag: '代码生成', isAuth: false })
export class GenController {
  constructor(private readonly genService: GenService) {}

  @Post(':moduleName')
  @Handler({ tag: '代码生成' })
  genCode(@Param('moduleName') moduleName: string) {
    return this.genService.genCode(moduleName);
  }
}
