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
import { Book, BookDocument } from 'src/schemas/book.schema';
import { BooksService } from 'src/services/books.service';

type IParamId = {
  id: string;
};
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post() public create(@Body() createBookDto: CreateBookDto) {
    this.booksService.createBook(createBookDto);
  }

  @Get(':id')
  public getBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBook(id);
  }

  @Get() public getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param() { id }: IParamId): Promise<boolean> {
    return this.booksService.deleteBook(id);
  }
}
