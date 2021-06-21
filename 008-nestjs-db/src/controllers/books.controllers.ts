import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { UpdateBookDto } from 'src/dto/update-book.dto';
import { Book } from 'src/schemas/book.schema';
import { BooksService } from 'src/services/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post() async create(@Body() createBookDto: CreateBookDto) {
    this.booksService.createBook(createBookDto);
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBook(id);
  }

  @Get() async getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
