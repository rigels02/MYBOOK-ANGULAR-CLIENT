export class Book{
	constructor(
		public file:File,
		public id: Number,
    	public title: string,
		public author: string,
		public pages: Number,
		public publishDate: Date
	){}
}