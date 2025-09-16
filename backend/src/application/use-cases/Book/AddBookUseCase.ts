import { Book } from "../../../domain/entities/Book";
import { IBookRepository } from "../../interfaces/IBookRepository";

export class AddBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(bookData: Omit<Book, "bookId">): Promise<Book> {
    const newBook = await this.bookRepository.create(bookData);
    return newBook;
  }
}
