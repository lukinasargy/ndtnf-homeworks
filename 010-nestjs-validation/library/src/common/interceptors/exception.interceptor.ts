import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('New request!');
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log(`\nExecution time: ${Date.now() - now}ms`);
        console.log('\nRequest was successful!');
        return {
          status: 'success',
          data: data, // данные из контроллера
        };
      }),
      catchError((err) => {
        console.log(`\nExecution time: ${Date.now() - now}ms`);
        console.log('\nRequest was failed!');
        return of({
          status: 'fail',
          data: err.message, // сведения об ошибке
        });
      }),
    );
  }
}
