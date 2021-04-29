import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { LogInterceptor } from './common/interceptor/log.interceptor';
import { LogService } from './modules/log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  const prefix = configService.get('app.prefix');

  //设置统一前缀
  app.setGlobalPrefix(prefix);
  //注册参数校验管道
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor(), new LogInterceptor(app.get(LogService)));
  //注册过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Nest Admin')
    .setDescription('Nest Admin API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    Logger.log(`Server started at:http://127.0.0.1:${port}`);
    Logger.log(`Swagger started at:http://127.0.0.1:${port}/doc`);
  });
}
bootstrap();
