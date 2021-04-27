import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { responseSuccess } from 'src/utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reflector = new Reflector();
    const controllerTag = reflector.get<string>('log', context.getClass());
    const handlerTag = reflector.get<string>('log', context.getHandler());
    const message = `${controllerTag}-${handlerTag}成功`;
    return next.handle().pipe(map((data) => responseSuccess(data, message)));
  }
}
