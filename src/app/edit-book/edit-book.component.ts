import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";

import { ApiService} from '../api.service';
import { Book } from '../model/Book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book:  Book;
  bookEditForm: FormGroup;
  isError:boolean = false;
  errMsg:String;

  constructor(private  apiService:  ApiService, 
              private route :ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    let currentId = this.route.snapshot.paramMap.get('id')
    //build edit form
    this.bookEditForm= this.formBuilder.group(
    {id: [''], title: [''], author:[''],pages:[0] }
        )  
   this.apiService.getBookById(currentId)
   .subscribe( (data:Book) => 
      {
        this.book = data
        this.fillForm(this.book)

      }
    )

    console.log(this.book)
  }

  private fillForm(book: Book){
    this.bookEditForm = this.formBuilder.group(
      { 
        id: [book.id],
        title: [book.title], 
        author:[book.author],
        pages:[book.pages]
       }
          )
  }
 

  updateBook(){
   // console.log(this.bookEditForm.value)
   var book= this.bookEditForm.value
   
    this.apiService.updateBook(book).subscribe((response) => {
        console.log(response);
        this.router.navigate(['books'])
        })
  }

  cancelBook(){
    this.router.navigate(['books']) 
  }

}
