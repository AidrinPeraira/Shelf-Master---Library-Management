export interface Book {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  publishedDate: Date;
  available: boolean;
  donatedBy: string; // this will be a user id
}
