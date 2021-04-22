const { Book } = require("./");
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
    getBook(id: BookId) {}
    async getBooks() {
        return await Book.find();
    }
    updateBook(id: BookId) {}
    deleteBook(id: BookId) {}
}
