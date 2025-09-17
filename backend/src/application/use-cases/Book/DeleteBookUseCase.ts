import { IBookRepository } from "../../repositories/IBookRepository.js";

export class DeleteBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(bookId: string): Promise<void> {
    await this.bookRepository.delete(bookId);
  }
}
