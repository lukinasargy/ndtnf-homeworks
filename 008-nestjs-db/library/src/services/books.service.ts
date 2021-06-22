import { Injectable } from '@nestjs/common';
import * as uidGenerator from 'node-unique-id-generator';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
import { Connection, Model } from 'mongoose';

type BookId = string;

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public createBook(book: Book) {
    const newBook = new this.BookModel(book);
    return newBook.save();
  }
  public getBook(id: BookId) {
    return this.BookModel.findById(id).exec();
  }
  public getBooks() {
    return this.BookModel.find().exec();
  }
  public updateBook(id: BookId, book: Book) {
    return this.BookModel.findByIdAndUpdate(id, book).exec();
  }
  public deleteBook(id: BookId) {
    return !!this.BookModel.findByIdAndDelete(id);
  }
}
