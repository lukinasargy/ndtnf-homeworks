import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksController } from './controllers/books.controllers';
import { BooksService } from './services/books.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:1111@localhost:27017/example')],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})

export class AppModule {}
