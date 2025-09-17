import { Book } from "../../../domain/entities/Book.js";
import { IBookRepository } from "../../repositories/IBookRepository.js";

export class GetBookByIdUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(bookId: string): Promise<Book | null> {
    const book = await this.bookRepository.findById(bookId);
    return book;
  }
}
