import { Module } from '@nestjs/common';
import { InitDbService } from './init-db.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [UserModule, RoleModule],
  providers: [InitDbService],
  exports: [InitDbService]
})
export class InitDbModule {}
