import { InitDbModule } from './init-db/init-db.module';
import { AuthModule } from './auth/auth.module';
import { GenModule } from './gen/gen.module';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { DeptModule } from './dept/dept.module';
import { RoleModule } from './role/role.module';
import { JobModule } from './job/job.module';

export default [InitDbModule, AuthModule, GenModule, LogModule, UserModule, DeptModule, RoleModule, JobModule];
