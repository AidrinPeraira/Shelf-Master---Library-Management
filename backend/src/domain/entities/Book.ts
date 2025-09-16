export interface Book {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  publishedDate: Date;
  donatedBy: string; // this will be a user id
}
