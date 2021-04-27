const express = require("express");
const axios = require("axios");
const router = express.Router();
const { BooksRepository } = require("../models/BooksRepository");
const fileMiddleware = require("../middleware/file");

const booksRepository = new BooksRepository();

router.get("/", async (req, res) => {
    const books = await booksRepository.getBooks();

    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get("/create", (req, res) => {
    res.render("books/create", {
        title: "Books | create",
        books: {},
    });
});

router.post(
    "/create",
    fileMiddleware.fields([
        { name: "fileBook", maxCount: 1 },
        { name: "fileCover", maxCount: 1 },
    ]),
    async (req, res) => {
        const {
            title = "",
            description = "",
            authors = "",
            favorite = false,
            fileCover = "",
            fileBook = "",
        } = req.body;

        let fileName;

        if (req.files) {
            const { filename = "" } = req.files["fileBook"][0];
            fileName = filename;
        } else {
            res.json("file error");
            return;
        }

        const newBook = {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        };

        try {
            await booksRepository.createBook(newBook);
            res.redirect('/');

        } catch (e) {
            console.error(e);
        }
    }
);

router.get("/view/:id", async (req, res) => {
    const { id } = req.params;

    axios
        .post(`http://counter:3001/counter/${id}/incr`)
        .then(() => {
            axios
                .get(`http://counter:3001/counter/${id}`)
                .then(async (response) => {
                    let book;
                    try {
                        book = await booksRepository.getBook(id);
                        res.render("books/view", {
                            title: "Books | view",
                            book: book,
                            views: response.data,
                        });
                    } catch (e) {
                        console.error(e);
                        res.status(404).redirect("/404");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((err) => {
            console.error(err);
        });
});

router.get("/update/:id", async (req, res) => {
    const { id } = req.params;
    let book;
    try {
        book = await booksRepository.getBook(id);
        res.render("books/update", {
            title: "Book | view",
            books: book,
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect("/404");
    }
});

router.post(
    "/update/:id",
    fileMiddleware.fields([
        { name: "fileBook", maxCount: 1 },
        { name: "fileCover", maxCount: 1 },
    ]),
    async (req, res) => {
        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileBook,
        } = req.body;

        let fileName;

        if (req.files) {
            const { filename = "" } = req.files["fileBook"][0];
            fileName = filename;
        } else {
            res.json("file error");
            return;
        }

        const { id } = req.params;

        const updBook = {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        }

        try {
            await booksRepository.updateBook(updBook);
        } catch (e) {
            console.error(e);
            res.status(404).redirect("/404");
        }

        res.redirect(`/view/${id}`);
    }
);

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await booksRepository.deleteBook(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect("/404");
    }

    res.redirect(`/`);
});

router.get("/:id/download", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksRepository.getVersionBook(id);
        const fileName = book.fileName;
        res.download(
            __dirname + `/../public/book/${fileName}`,
            `${fileName.split("_filename_").pop()}`,
            (err) => {
                if (err) {
                    res.status(404).redirect("/404");
                }
            }
        );
    } catch (e) {
        console.error(e);
        res.status(404).redirect("/404");
    }
});
module.exports = router;
