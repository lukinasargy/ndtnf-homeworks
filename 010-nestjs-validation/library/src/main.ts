import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ExceptionInterceptor());
  await app.listen(3000);
}
bootstrap();
