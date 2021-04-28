import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import loadConfig from './config';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { GenModule } from './modules/gen/gen.module';
import { UsersModule } from './modules/users/users.module';
import { DeptsModule } from './modules/depts/depts.module';
import { RolesModule } from './modules/roles/roles.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: loadConfig
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('db'),
          entities: [__dirname + '/**/*.entity{.ts,.js}']
        };
      },
      inject: [ConfigService]
    }),
    AuthModule,
    GenModule,
    UsersModule,
    DeptsModule,
    RolesModule,
    JobsModule
  ],
  controllers: [AppController]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
