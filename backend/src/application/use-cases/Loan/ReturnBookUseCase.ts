import { Loan } from "../../../domain/entities/Loan.js";
import { IBookRepository } from "../../repositories/IBookRepository.js";
import { ILoanRepository } from "../../repositories/ILoanRepository.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";

export class ReturnBookUseCase {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly loanRepository: ILoanRepository
  ) {}

  async execute(bookId: string): Promise<Loan | null> {
    const loan = await this.loanRepository.findActiveLoanByBookId(bookId);
    if (!loan) throw new Error("This is book is not on loan");

    const updatedLoan = await this.loanRepository.update(loan.loanId, {
      returnDate: new Date(),
    });

    await this.bookRepository.update(bookId, { available: true });
    return updatedLoan;
  }
}
