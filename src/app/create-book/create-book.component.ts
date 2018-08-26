import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Form } from "@angular/forms";

import { ApiService} from '../api.service';
import { Book } from '../model/Book';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})

export class CreateBookComponent implements OnInit {
  
  isError:boolean=false
  errMsg:String

  model:Book
  selectedFile: File;

  constructor(private apiService: ApiService,
              private router:Router) { }

  ngOnInit() {
    this.model = new Book(null,0,"","",0)
  }

  onFileEvent(event){
    this.selectedFile= <File>event.target.files[0]
  }
  
  createBook(){
    console.log("create: "+this.model)
    const fd= new FormData()
    fd.append('file',this.selectedFile)
    fd.append('id',this.model.id.toString())
    fd.append('title',this.model.title)
    fd.append('author',this.model.author)
    fd.append('pages',this.model.pages.toString())

    this.apiService.createBook(fd).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['books'])
        }
    )
  }
  cancelBook(){
    this.router.navigate(['books'])
  }
}
