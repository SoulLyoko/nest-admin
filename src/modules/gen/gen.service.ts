import { Injectable } from '@nestjs/common';
import { capitalize, Exception } from 'src/utils';
import * as fs from 'fs';

@Injectable()
export class GenService {
  private moduleName: string;

  genCode(moduleName: string) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Exception('非开发环境下禁止生成代码');
    }
    if (fs.existsSync(`src/modules/${moduleName}`)) {
      throw new Exception('已存在模块:' + moduleName);
    }
    this.moduleName = moduleName;
    this.makeDir();
    ['entity', 'dto', 'service', 'controller', 'module'].forEach((type) => this.writeFile(type));
    return module;
  }

  makeDir() {
    fs.mkdirSync(`src/modules/${this.moduleName}`);
    fs.mkdirSync(`src/modules/${this.moduleName}/entities`);
    fs.mkdirSync(`src/modules/${this.moduleName}/dto`);
  }

  writeFile(type: string) {
    const extraPath = type === 'entity' ? '/entities' : type === 'dto' ? '/dto' : '';
    let entity = fs.readFileSync(`src/modules/template${extraPath}/template.${type}.ts`, 'utf-8');
    entity = entity.replace(/Template/g, capitalize(this.moduleName)).replace(/template/g, this.moduleName);
    fs.writeFileSync(`src/modules/${this.moduleName}${extraPath}/${this.moduleName}.${type}.ts`, entity);
  }
}
