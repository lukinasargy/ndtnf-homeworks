import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './controllers/books.controllers';
import { BooksService } from './services/books.service';

@Module({
  imports: [],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
