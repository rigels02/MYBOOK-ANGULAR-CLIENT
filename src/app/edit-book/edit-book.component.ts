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
  selectedFile: File;

  constructor(private  apiService:  ApiService, 
              private route :ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    let currentId = this.route.snapshot.paramMap.get('id')
    //build edit form
    this.bookEditForm= this.formBuilder.group(
    {id: [0], file: [], title: [''], author:[''],pages:[0], publishDate:[] }
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
        file:[],
        title: [book.title], 
        author:[book.author],
        pages:[book.pages],
        publishDate:[book.publishDate]
       }
      )
  }
 
  onFileEvent(event){
    this.selectedFile= <File>event.target.files[0]
  }

  updateBook(){
   // console.log(this.bookEditForm.value)
   var book:Book= this.bookEditForm.value
   const fd= new FormData()
    fd.append('file',this.selectedFile)
    fd.append('id',book.id.toString())
    fd.append('title',book.title)
    fd.append('author',book.author)
    fd.append('pages',book.pages.toString())
    fd.append('publishDate',book.publishDate.toString())
   
    this.apiService.updateBook(book.id,fd).subscribe((response) => {
        console.log(response);
        this.router.navigate(['books'])
        })
  }

  cancelBook(){
    this.router.navigate(['books']) 
  }

}
