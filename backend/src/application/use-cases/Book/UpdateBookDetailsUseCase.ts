import { Book } from "../../../domain/entities/Book";
import { IBookRepository } from "../../interfaces/IBookRepository";

export class UpdateBookDetailsUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(
    bookId: string,
    book: Partial<Omit<Book, "bookId">>
  ): Promise<Book | null> {
    const updatedBook = await this.bookRepository.update(bookId, book);
    return updatedBook;
  }
}
