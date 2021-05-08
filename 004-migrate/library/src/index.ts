import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose';

import {loggerMiddleware} from './middleware/logger';
import {errorMiddleware} from './middleware/error';

import {indexRouter} from './routes/index';
import {booksApiRouter} from './routes/api/books';
import {userRouter} from './routes/user';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(cors());
app.use(loggerMiddleware);

app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'

async function start () {
    try {
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`=== start server PORT http://localhost:${PORT} ===`);
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
