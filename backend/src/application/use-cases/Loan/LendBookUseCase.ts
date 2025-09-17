import { Loan } from "../../../domain/entities/Loan.js";
import { IBookRepository } from "../../repositories/IBookRepository.js";
import { ILoanRepository } from "../../repositories/ILoanRepository.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";

export class LendBookUseCase {
  constructor(
    private readonly loanRepository: ILoanRepository,
    private readonly userRepository: IUserRepository,
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(bookId: string, userId: string): Promise<Loan> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error("The entered book id does not exist");

    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("The user does not exist");

    if (!book.available) throw new Error("This book is unavailable right now"); // it is loaned by someone

    const existingLoan = await this.loanRepository.findActiveLoanByBookId(
      bookId
    );
    if (existingLoan) throw new Error("This book is already on loan.");

    //create new loan
    const loanDate = new Date();
    const dueDate = new Date(loanDate);
    dueDate.setDate(loanDate.getDate() + 14);

    const newLoan = await this.loanRepository.create({
      bookId,
      userId,
      loanDate,
      dueDate,
    });

    await this.bookRepository.update(bookId, { available: false });

    return newLoan;
  }
}
