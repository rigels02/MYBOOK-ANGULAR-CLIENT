import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';
import { Book } from '../model/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  isError: boolean = false
  errMsg: String
  books: Book[]
  currTime

  constructor(private bookService: ApiService, private router:Router) { }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((data: Book[]) => { 
        this.books = data 
        /**
         * Refresh image with a new one at the same url.
         * If for the book image is changed book.id remains the same and img src url remains 
         * the same too. Component is not sending request to load the new image.
         * To get rid this we are adding a cachebreaker at the end of the url.
         */
        this.currTime =  new Date().getTime()
      }, err => {
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

