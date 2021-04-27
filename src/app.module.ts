import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TemplateModule } from './modules/template/template.module';
import { UsersModule } from './modules/users/users.module';
import { DeptsModule } from './modules/depts/depts.module';
import { RolesModule } from './modules/roles/roles.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, TemplateModule, UsersModule, DeptsModule, RolesModule, JobsModule],
  controllers: [AppController]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
