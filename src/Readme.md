# My books angular client v2

The back-end application from this Angular client is sb-mybook-angular branch V2.

Angular client for sb-mybook-angular
url= http://localhost:8080/api

TODO: test Angular client distr building and its including into backend (sb-mybook-angular) folder
without/with maven plugin: com.github.eirslett:frontend-maven-plugin

## Image upload in V2

In V1 an image uploading is done with one step, just by sending FormData( book+ image) as multipart/form-data request.

Image uploading in V2 is done in two steps:

- post/put httpClient request with Book json object to create/update Book
- send file FormData as multipart/form-data request to attach image for the Book


## Rest Api endpoints

Books REST API endpoints:

   - /api/books: create or read a list of books

   - /api/books/&lt;id>: read, update or delete an book


## Add components

- book (book.component)
    'book' shows list of books and is able to add,edit and delete selected book.
    For 'add' and 'edit' calls components 'add-book' and 'edit-book'
- create-book (create-book.component) 
    add new book and navigate to 'book' component
- edit-book (edit-book.component)
    edit book and navigate to 'book' component

 ## Add service ApiService
 The ApiService calls remote Books repository by using Restful api with HttpClient module.

 ~~~
 ng g service api
 ~~~
 
 ### Add proxy
 To be able to access remote resources on http://localhost:8080/api
 we have to add proxy.
 Proxy must be defined in file proxy.config  with content:
   ~~~
   {
  "/api/*": {
    "target": "http://localhost:8080/api",
    "secure": false
  }
}
   ~~~
   
   And in package.json:
   ~~~
    "start": "ng serve --proxy-config proxy.config.json"
   ~~~
   In spring boot application in Restcontroller class exposing api/books the CrossOrigin must be defined:

   ~~~
    @RestController
    @RequestMapping("/api")
    @CrossOrigin(origins = "http://localhost:4200")
    public class BookApi {
   ~~~

 ## Add app routing module

Routing module can be created during of app creation:
~~~
ng new mybook-angular-client --routing
~~~

Manually it can be done as follows:
- add a separate module (which can be called AppRoutingModule) in a file app-routing.module.ts, and import the module by including it in the imports of main AppModule
- add &lt;router-outlet>&lt;/router-outlet> in app.component.html (this is where the Angular Router will insert components matching the current path),
- add routes (each route is an object with properties such as path and component etc.) in **const routes: Routes**.
 
 Creates the folowing paths to components:

 ~~~
 const routes: Routes = [
    { path:  '', redirectTo:  'books', pathMatch:  'full' },
    { path: 'books', component: BookComponent},
    { path: 'books/:id', component: EditBookComponent},
    { path: 'creat-book', component:CreateBookComponent}
];
 ~~~ 

 ## Notes regarding Forms

 To use form components in app.module.ts it is necessary to import: 
  - FormsModule  to use   template-driven form
  - ReactiveFormsModule to use Reactive form

  Add these modules into imports set:
  ~~~
 imports: [
   FormsModule,
    ReactiveFormsModule
  ],
  ~~~
  In edit-book.components.ts we can declare now like this:

  ~~~
  import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";

export class EditBookComponent implements OnInit {

bookEditForm: FormGroup; //form goupe used in html temaplate

constructor(private  apiService:  ApiService, 
              private route :ActivatedRoute,
              private router:Router,
              /*Declare formBuilder*/
              private formBuilder: FormBuilder) { }

 ngOnInit() {
    
   ...
    //build edit form
    this.bookEditForm= this.formBuilder.group(
    {id: [''], title: [''], author:[''],pages:[0] }
        ) 
    ...                 
  ~~~

 