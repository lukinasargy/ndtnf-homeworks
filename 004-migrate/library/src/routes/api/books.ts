import express from "express";
const router = express.Router();
import { Book } from "../../models/Books";
import { fileMiddleware } from "../../middleware/file";

router.get("/", async (req: any, res: any) => {
    const books = await Book.find();
    res.json(books);
});

router.get("/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).select("-__v");
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json("book | not found");
    }
});

router.post(
    "/",
    fileMiddleware.single("fileBook"),
    async (req: any, res: any) => {
        const books = await Book.find();
        const {
            title = "",
            description = "",
            authors = "",
            favorite = "",
            fileCover = "",
            fileBook = "",
        } = req.body;
        let fileName;

        if (req.file) {
            const { path, filename } = req.file;
            fileName = filename;
        } else {
            res.json("file error");
            return;
        }

        const newBook = new Book({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        });
        try {
            await newBook.save();
            res.json(newBook);
        } catch (e) {
            console.error(e);
            res.status(500).json();
        }
    }
);

router.put(
    "/:id",
    fileMiddleware.single("fileBook"),
    async (req: any, res: any) => {
        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileBook,
        } = req.body;
        let fileName;

        if (req.file) {
            const { path, filename } = req.file;
            fileName = filename;
        } else {
            res.json("file error");
            return;
        }

        const { id } = req.params;

        try {
            await Book.findByIdAndUpdate(id, {
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook,
            }).orFail(() => res.status(404).json("book | not found"));
            res.redirect(`/api/books/${id}`);
        } catch (e) {
            console.error(e);
            res.status(500).json();
        }
    }
);

router.delete("/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await Book.deleteOne({ _id: id });
        res.json("ok");
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.get("/:id/download", async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).select("-__v");
        const fileName = book.fileName;
        res.download(
            __dirname + `/../public/book/${fileName}`,
            `${fileName.split("_filename_").pop()}`,
            (err:any) => {
                if (err) {
                    res.status(404);
                    res.json("file | not found");
                }
            }
        );
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json("book | not found");
    }
});
export const booksApiRouter = router;
