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

  async createBook(book: Book) {
    const newBook = new this.BookModel(book);
    try {
      await newBook.save();
      return newBook;
    } catch (error) {
      console.error(error);
    }
  }
  async getBook(id: BookId) {
    return this.BookModel.findById(id);
  }
  async getBooks() {
    return this.BookModel.find();
  }
  async updateBook(id: BookId, book: Book) {
    try {
      return await this.BookModel.findByIdAndUpdate(id, book);
      // return this.BookModel.findById(id);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteBook(id: BookId) {
    try {
      return await !!this.BookModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
    }
  }
}
