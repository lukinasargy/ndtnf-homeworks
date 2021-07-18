import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { Connection, Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

type BookId = string;

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>
  ) {}

  public createBook(book: CreateBookDto) {
    const newBook = new this.BookModel(book);
    return newBook.save();
  }
  public getBook(id: BookId) {
    return this.BookModel.findById(id).exec();
  }
  public getBooks() {
    return this.BookModel.find().exec();
  }
  async updateBook(id: BookId, book: UpdateBookDto) {
    return await this.BookModel.findByIdAndUpdate(id, book).exec();
  }
  async deleteBook(id: BookId): Promise<boolean> {
    return !!(await this.BookModel.findByIdAndDelete(id));
  }
}
