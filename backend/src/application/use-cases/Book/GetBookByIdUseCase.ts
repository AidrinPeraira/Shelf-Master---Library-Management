import { Book } from "../../../domain/entities/Book";
import { IBookRepository } from "../../interfaces/IBookRepository";

export class GetBookByIdUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(bookId: string): Promise<Book | null> {
    const book = await this.bookRepository.findById(bookId);
    return book;
  }
}
