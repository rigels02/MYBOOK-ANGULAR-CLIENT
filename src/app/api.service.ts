import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './model/Book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getBooks() {
    return this.httpClient.get(this.API_URL + '/books')

  }
  updateBook(book:Book){
    return this.httpClient.put(this.API_URL+'/books/'+book.id, book)
  }
  deleteBook(id:Number){
    return this.httpClient.delete(this.API_URL+'/books/'+id)
  }
  getBookById(id){

    return this.httpClient.get(this.API_URL+'/books/'+id)
  }
  createBook(book:Book){
    return this.httpClient.post(this.API_URL+'/books/',book)
  }
}
