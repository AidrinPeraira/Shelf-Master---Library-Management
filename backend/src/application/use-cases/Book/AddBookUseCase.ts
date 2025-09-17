import { Book } from "../../../domain/entities/Book.js";
import { IBookRepository } from "../../repositories/IBookRepository.js";

export class AddBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(bookData: Omit<Book, "bookId">): Promise<Book> {
    bookData.available = true;
    const newBook = await this.bookRepository.create(bookData);
    return newBook;
  }
}
