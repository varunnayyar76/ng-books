import { Component, OnInit, Input } from '@angular/core';
import { BookService } from "../../services/book.service";
import { Book } from "../../../model/book";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { EditDetailComponent } from "../edit-detail/edit-detail.component";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public id: number;
  public book: Book;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private eventService: EventService
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getBookById(this.id);
    });
  }

  ngOnInit() {
  }

  public getBookById(id) {
    this.bookService.getBookById(id).then((bookDetail: Book) => {
      if (bookDetail && bookDetail[0]) {
        this.book = bookDetail[0];
      }
    }).catch((error) => { console.log("error", error); })
  }

  public goToBookEdit(data) {
    let dialogRef = this.dialog.open(EditDetailComponent, {
      data: data,
      width: '760px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      this.book = result;
      this.book.id = this.id;
      this.eventService.broadcast("edit", this.book);
    });
  }

  public goBack() {
    this.router.navigate(["/"]);
  }
}
