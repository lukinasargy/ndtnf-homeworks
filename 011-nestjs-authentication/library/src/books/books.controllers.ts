import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { createBookSchema } from 'src/common/joi/create-book.schema';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { ParseIdPipe } from 'src/common/pipes/parse-id.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { BooksService } from './books.service';

type IParamId = {
  id: string;
};
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createBookSchema))
  public create(@Body() createBookDto: CreateBookDto) {
    this.booksService.createBook(createBookDto);
  }

  @Get(':id')
  public getBook(@Param('id', new ParseIdPipe()) id: string): Promise<Book> {
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
