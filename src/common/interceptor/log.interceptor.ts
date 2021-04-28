import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reflector = new Reflector();
    const controllerTag = reflector.get<string>('log', context.getClass());
    const handlerTag = reflector.get<string>('log', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const {
      method,
      url,
      headers: { host, 'user-agent': userAgent }
    } = request;
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
      }),
      catchError((err: Error) => {
        Logger.error(`${method} ${url} ${Date.now() - now}ms`, err.stack, context.getClass().name);
        return throwError(err);
      })
    );
  }
}
