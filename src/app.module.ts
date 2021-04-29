import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import loadConfig from './config';
import Modules from './modules';

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
    ...Modules
  ],
  controllers: [AppController]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
