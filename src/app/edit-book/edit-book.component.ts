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
  selectedFileName: string;

  constructor(private  apiService:  ApiService, 
              private route :ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    let currentId = this.route.snapshot.paramMap.get('id')
    //build edit form
    this.bookEditForm= this.formBuilder.group(
    {id: [0], title: [''], file:[], author:[''],pages:[0], publishDate:[] }
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
        file: [],
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
   var bookM:Book= new Book(book.id,book.title,book.author,book.pages,book.publishDate,null);
   
    this.apiService.updateBook(book.id,bookM).subscribe((response) => {
        console.log(response);
        this.isError = false
        if(this.selectedFile == undefined || this.selectedFile==null){
            this.router.navigate(['books'])
            return
        }
        const fd = new FormData()
        fd.append('file',this.selectedFile)
        this.apiService.uploadImage(book.id, fd).subscribe(
          (response) => {
            console.log(response)
            this.router.navigate(['books'])
          },
          (error) => this.handleError(error) 
        )
       },
        (error) => this.handleError(error) 
        )
  }

  private handleError(error){
    console.log(error); this.isError = true; this.errMsg = error;
    window.location.reload(); 
  }

  cancelBook(){
    this.router.navigate(['books']) 
  }



}
