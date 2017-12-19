import { Component, OnInit } from '@angular/core';
import { BookService } from "../../services/book.service";
import { Book } from "../../../model/book";
import { Router } from "@angular/router";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public length: number = 0;
  public books = [];
  public page: number = 1;
  public index: number = 0;

  constructor(
    private bookService: BookService,
    private router: Router,
    private EventService: EventService
  ) {

    this.EventService.subscribe("edit", (payload) => {
      for (var ind = 0; ind < this.books.length; ind++) {
        if (this.books[ind].id == payload.id) {
          this.books[ind] = payload;
        }
      }
    });
  }

  ngOnInit() {
    this.bookService.getBooks().then((books: Book[]) => {
      if (books) {
        this.books = books;
        this.length = books.length;
      }
    })
  }

  goToBookDetail(id) {
    this.router.navigate(["/book-detail", id])
  }

}
