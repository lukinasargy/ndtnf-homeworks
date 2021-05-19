import { Injectable } from '@nestjs/common';
import { Book } from 'src/interfaces/book.interface';
import * as uidGenerator from 'node-unique-id-generator';

type BookId = string;

@Injectable()
export class BooksService {
  private readonly books: (Book & { id: string })[] = [];

  async createBook(book: Book) {
    const id = uidGenerator.generateUniqueId();
    const newBook = { id, ...book };
    this.books.push(newBook);
    return newBook;
  }
  async getBook(id: BookId) {
    return this.books.find((book) => book.id === id);
  }
  async getBooks() {
    return this.books;
  }
  async updateBook(id: BookId, book: Book) {
    const idx = this.books.findIndex((el) => el.id === id);

    if (idx !== -1) {
      this.books[idx] = {
        ...this.books[idx],
        ...book,
      };
    } else {
      console.error('id not found');
    }
    return this.books[idx];
  }
  async deleteBook(id: BookId) {
    const idx = this.books.findIndex((el) => el.id === id);

    if (idx !== -1) {
      this.books.splice(idx, 1);
      return true;
    } else {
      console.error('id not found');
      return false;
    }
  }
}
