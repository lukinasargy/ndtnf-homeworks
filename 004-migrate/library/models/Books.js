const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: "Title",
    },
    description: {
        type: String,
        default: "Descr",
    },
    authors: {
        type: String,
        default: "Authors",
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false,
    },
    fileCover: {
        type: String,
        default: "fileCover",
    },
    fileName: {
        type: String,
        default: "2021-02-22T21-32-00.287Z_filename_book.pdf",
    },
    fileBook: {
        type: String,
        default: "fileBook",
    },
});

module.exports = model('Book', bookSchema);
