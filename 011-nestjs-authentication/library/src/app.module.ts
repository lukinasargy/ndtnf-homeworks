import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BookModule } from './books/book.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017/books_database'), BookModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
