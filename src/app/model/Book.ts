export class Book{
	constructor(
		public id: Number,
    	public title: string,
		public author: string,
		public pages: Number,
		public publishDate: Date,
		public coverImage:ImageBitmap
	){}
}