import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from "./components/books/books.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { EditDetailComponent } from "./components/edit-detail/edit-detail.component";

// Route Configuration  
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: BooksComponent },
  { path: 'book-detail/:id', component: BookDetailsComponent },
  { path: 'book-edit/:id', component: EditDetailComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);