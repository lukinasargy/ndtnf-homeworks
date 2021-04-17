const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(cors());

const fileName = "counter.json";
const file = path.join(__dirname, fileName);
app.get("/", (req,res)=>{
    res.redirect("/counter");
})
app.get("/counter", (req, res) => {
    fs.access(file, (err) => {
        if (err) {
            res.status(404).json(
                "You need to POST /counter/:bookId/incr first"
            );
            return;
        }
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            if (data) {
                let counter = JSON.parse(data);
                res.status(200).json(counter);
            }
        });
    });
});
app.get("/counter/:bookId", (req, res) => {
    const { bookId } = req.params;

    fs.access(file, (err) => {
        if (err) {
            res.status(404).json(
                "You need to POST /counter/:bookId/incr first"
            );
            return;
        }
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            if (data) {
                let counter = JSON.parse(data);
                if (counter[bookId]) {
                    res.status(200).json(counter[bookId]);
                } else res.status(404).json("Book ID not found");
            }
        });
    });
});
app.post("/counter/:bookId/incr", (req, res) => {
    const { bookId } = req.params;

    fs.access(file, (err) => {
        let counter = {};
        counter[bookId] = 0;
        if (err) {
            //if file doesn't exist

            fs.writeFile(file, JSON.stringify(counter), (err) => {
                if (err) throw err;
                console.log("The file has been created!");
            });
        }
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            if (data) {
                counter = JSON.parse(data);
                
                if (counter[bookId]) {
                    counter[bookId] += 1;
                } else {
                    counter[bookId] = 1;
                }
            }

            fs.writeFile(file, JSON.stringify(counter), (err) => {
                if (err) throw err;
                res.status(200).json(counter[bookId]);
                return;
            });
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT http://localhost:${PORT} ===`);
});
