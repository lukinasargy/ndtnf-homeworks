import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';
import { BooksController } from './books.controller';
import * as mongoose from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDocument, BookSchema } from './book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

describe('Books', () => {
  let app: INestApplication;
  let booksService = {
    getBooks: async () => ['test'],
    getBook: async (id:string) => book,
    createBook: async (book: CreateBookDto) => book,
    updateBook: async (id: string,book: UpdateBookDto) => book,
    deleteBook: async (id:string) => 'deleted'
  };

  const book: CreateBookDto = {
    title: 'string',
    description: 'string',
    authors: 'string',
    favorite: false,
    fileCover: 'string',
    fileName: 'string',
    fileBook: 'string',
  };

  const bookModel = mongoose.model<BookDocument>('bookModel', BookSchema);
  const result = new bookModel(book);


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, async () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(await booksService.getBooks());
  });

  it('/GET book by id', async () => {
    return request(app.getHttpServer())
      .get(`/books/${result._id}`)
      .expect(200)
      .expect(await booksService.getBook(result._id));
  });

  it('/POST create book', async () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(book)
      .expect(201)
      .expect(await booksService.createBook(book));
  });

  it('/PUT update book', async () => {
    return request(app.getHttpServer())
      .put(`/books/${result._id}`)
      .send(book)
      .expect(200)
      .expect(await booksService.updateBook(result._id, book));
  });

  it('/DELETE delete book', async () => {
    return request(app.getHttpServer())
      .delete(`/books/${result._id}`)
      .expect(200)
      .expect(await booksService.deleteBook(result._id));
  });

  afterAll(async () => {
    await app.close();
  });
});
