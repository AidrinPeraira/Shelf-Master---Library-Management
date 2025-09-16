import { Book } from "../../../domain/entities/Book";
import { IBookRepository } from "../../interfaces/IBookRepository";

export class GetAllBooksUseCase {
  constructor(private readonly booksRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.booksRepository.findAll();
    return books;
  }
}
