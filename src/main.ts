import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { LogInterceptor } from './common/interceptor/log.interceptor';

const { PORT, PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //设置统一前缀
  app.setGlobalPrefix(PREFIX);
  //注册参数校验管道
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor(), new LogInterceptor());
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

  await app.listen(PORT, () => {
    Logger.log('Server started at:http://127.0.0.1:3000');
    Logger.log('Swagger started at:http://127.0.0.1:3000/doc');
  });
}
bootstrap();
