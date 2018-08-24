import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { EditBookComponent} from './edit-book/edit-book.component';
import { CreateBookComponent } from './create-book/create-book.component';


const routes: Routes = [
    { path:  '', redirectTo:  'books', pathMatch:  'full' },
    { path: 'books', component: BookComponent},
    { path: 'books/:id', component: EditBookComponent},
    { path: 'creat-book', component:CreateBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }