interface IBook {
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover: string;
    fileName: string;
    fileBook: string;
}
export class BooksRepository {
    createBook(book: IBook) {}
    getBook(id: string) {}
    getBooks() {}
    updateBook(id: string) {}
    deleteBook(id: string) {}
}
