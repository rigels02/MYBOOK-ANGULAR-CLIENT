import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';
//import { Book } from '../model/Book';
import { BookE } from '../model/BookE';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  isError: boolean = false
  errMsg: String
  books: BookE[]

  constructor(private bookService: ApiService, private router:Router) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((data: BookE[]) => { this.books = data },
        err => {
          this.putErr(err)
        })
  }

  private putErr(err) {
    console.log("Error==>: " + err)
    this.isError = true;
    this.errMsg = "Error to Connect!"
  }

  onEdit(id) {
    console.log("To be Edit...")
    this.router.navigate(['books',id])
  }
  onDelete(id) {
    console.log("To be Deleted..."+id)
   
    let ok = confirm("Delete record #"+id+" ?!")
    if(ok){
        this.bookService.deleteBook(id).subscribe(resp=>{
            console.log(resp)
        },
            err=>{ this.putErr(err)})
    } else {
        return
    }
    //reload current page
    window.location.reload(); 
    }
}

