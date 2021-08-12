import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Book, BookDocument, BookSchema } from './book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import * as mongoose from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

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

  const mockBooksService = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBooksService,
        },
      ],
    }).compile();

    booksService = await moduleRef.get<BooksService>(BooksService);
    booksController = await moduleRef.get<BooksController>(BooksController);
  });

  describe('getBooks', () => {
    it('should return an array of books', async () => {
      const result = [new bookModel(book)];
      jest.spyOn(booksService, 'getBooks').mockResolvedValue(result);
      expect(await booksController.getBooks()).toBe(result);
    });
  });

  describe('getBook', () => {
    it('should return book', async () => {
      const result = new bookModel(book);
      jest.spyOn(booksService, 'getBook').mockResolvedValue(result);
      expect(await booksController.getBook(result._id)).toBe(result);
    });
  });

  describe('deleteBook', () => {
    it('should delete book', async () => {
      const result = new bookModel(book);
      jest.spyOn(booksService, 'deleteBook').mockResolvedValue(true);
      expect(await booksController.delete(result._id)).toBe(true);
    });
  });

  describe('updateBook', () => {
    it('should update book', async () => {
      const result = new bookModel(book);
      jest.spyOn(booksService, 'updateBook').mockResolvedValue(result);
      expect(await booksController.update(result._id, book)).toBe(result);
    });
  });

  describe('createBook', () => {
    it('should create book', async () => {
      const result = new bookModel(book);
      jest.spyOn(booksService, 'createBook').mockResolvedValue(result);
      expect(await booksController.create(book)).toBe(result);
    });
  });
});
