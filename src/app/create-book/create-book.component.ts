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

  constructor(private apiService: ApiService,
              private router:Router) { }

  ngOnInit() {
    this.model = new Book(0,"","",0)
  }

  createBook(){
    console.log("create: "+this.model)
    this.apiService.createBook(this.model).subscribe(
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
