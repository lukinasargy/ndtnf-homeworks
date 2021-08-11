import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { createBookSchema } from '../common/joi/create-book.schema';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ParseIdPipe } from '../common/pipes/parse-id.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

type IParamId = {
  id: string;
};
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createBookSchema))
  public create(@Body() createBookDto: CreateBookDto) {
    this.booksService.createBook(createBookDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public getBook(@Param('id', new ParseIdPipe()) id: string): Promise<Book> {
    return this.booksService.getBook(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() { id }: IParamId): Promise<boolean> {
    return this.booksService.deleteBook(id);
  }
}
