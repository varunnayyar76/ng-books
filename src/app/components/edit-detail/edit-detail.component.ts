import { Component, OnInit, Inject } from '@angular/core';
import { BookService } from "../../services/book.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from "../../../model/book";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {
  public book: any;
  public editForm: FormGroup;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialogRef<EditDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.getBookById(id);
    });
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      isbn: new FormControl(this.data.isbn, Validators.required),
      title: new FormControl(this.data.title, Validators.required),
      subtitle: new FormControl(this.data.subtitle, Validators.required),
      author: new FormControl(this.data.author, Validators.required),
      published: new FormControl(this.data.published, Validators.required),
      publisher: new FormControl(this.data.publisher, Validators.required),
      pages: new FormControl(this.data.pages, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
      website: new FormControl(this.data.website, Validators.required)
    });
  }

  public getBookById(id) {
    this.bookService.getBookById(id).then((bookDetail: Book) => {
      if (bookDetail && bookDetail[0]) {
        this.book = bookDetail[0];
      }
    }).catch((error) => { console.log("error", error); })
  }

}
