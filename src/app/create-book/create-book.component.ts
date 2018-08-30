import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Form } from "@angular/forms";

import { ApiService} from '../api.service';
import { Book } from '../model/Book';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})

export class CreateBookComponent implements OnInit {
  
  isError:boolean=false
  errMsg:String

  model:Book
  selectedFile: File
  fileName:string=''

  constructor(private apiService: ApiService,
              private router:Router) { }

  ngOnInit() {
    this.model = new Book(0,"","",0,new Date(),null)
  }

  onFileEvent(event){
    this.selectedFile= <File>event.target.files[0]
  }
  
  createBook(){
    console.log("create: "+this.model)
    
    const fd = new FormData()
    fd.append('file',this.selectedFile)

    this.apiService.createBook(this.model).subscribe(
      (book: Book) => {
        console.log(book);
        this.isError = false
        if(this.selectedFile == undefined || this.selectedFile==null){
            this.router.navigate(['books'])
            return
        }
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
