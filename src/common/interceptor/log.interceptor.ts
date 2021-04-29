import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from 'src/modules/log/log.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private logService: LogService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const reflector = new Reflector();
    const classTag = reflector.get<string>('log', context.getClass());
    const handlerTag = reflector.get<string>('log', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const {
      method,
      url,
      headers: { host, 'user-agent': userAgent },
      user,
      body
    } = request;
    const defaultLogInfo = {
      status: '0',
      name: `${classTag}${classTag && handlerTag ? '-' : ''}${handlerTag}`,
      method,
      url,
      username: user?.username,
      userAgent,
      ip: host,
      params: JSON.stringify(body)
    };
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
        if (method === 'GET') return;
        this.logService.create({
          ...defaultLogInfo,
          time: `${Date.now() - now}ms`
        });
      }),
      catchError((err: Error) => {
        Logger.error(`${method} ${url} ${Date.now() - now}ms`, err.stack, context.getClass().name);
        this.logService.create({
          ...defaultLogInfo,
          status: '1',
          message: err.message,
          time: `${Date.now() - now}ms`
        });
        return throwError(err);
      })
    );
  }
}
