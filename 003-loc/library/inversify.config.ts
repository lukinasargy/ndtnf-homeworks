import "reflect-metadata";
import { Container, decorate, injectable } from "inversify";
import { BooksRepository } from "./services/BooksRepository";

const container = new Container();

decorate(injectable(), BooksRepository);

container.bind(BooksRepository).toSelf();

export { container };
