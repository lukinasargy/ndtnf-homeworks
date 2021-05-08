import { Book } from "../models/Books";
interface IBook {
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover: string;
    fileName: string;
    fileBook: string;
}

type BookId = string;

export class BooksRepository {
    async createBook(book: IBook) {
        const newBook = new Book(book);
        try {
            await newBook.save();
        } catch (e) {
            console.error(e);
        }
    }
    async getBook(id: BookId) {
        return await Book.findById(id);
    }
    async getBooks() {
        return await Book.find();
    }
    async updateBook(id: BookId, book: IBook) {
        try {
            await Book.findByIdAndUpdate(id, book);
        } catch (e) {
            console.error(e);
        }
    }
    async deleteBook(id: BookId) {
        try {
            await Book.deleteOne({ _id: id });
        } catch (e) {
            console.error(e);
        }
    }
    async getVersionBook (id:BookId) {
        return await Book.findById(id).select("-__v");
    }
}
