import { Injectable } from '@angular/core';
import { Books } from "../../mock-data/books";
import { Book } from "../../model/book";

@Injectable()
export class BookService {

  constructor() { }

  public getBooks() {
    return new Promise((resolve, reject) => {
      if (Books) {
        resolve(Books);
      } else {
        reject("No books found");
      }
    })
  }

  public getBookById(id: number) {
    return new Promise((resolve, reject) => {
      if (Books) {
        resolve(Books.filter(book => book.id == id));
      } else {
        reject("No books found");
      }
    })
  }
}