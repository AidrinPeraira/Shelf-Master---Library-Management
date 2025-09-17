import { Book } from "../../../domain/entities/Book.js";
import { IBookRepository } from "../../repositories/IBookRepository.js";

export class GetAllBooksUseCase {
  constructor(private readonly booksRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.booksRepository.findAll();
    return books;
  }
}
