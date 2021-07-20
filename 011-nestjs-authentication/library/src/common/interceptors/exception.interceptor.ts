import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log(`\nExecution time: ${Date.now() - now}ms`);
        console.log('\nRequest was successful!');
        if (data === null) {
          throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return {
          status: 'success',
          data: data, // данные из контроллера
        };
      }),
    );
  }
}
