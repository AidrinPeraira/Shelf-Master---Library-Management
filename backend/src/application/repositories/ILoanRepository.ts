import { Loan } from "../../domain/entities/Loan.js";

export interface ILoanRepository {
  create(loan: Omit<Loan, "loanId">): Promise<Loan>;

  findById(loanId: string): Promise<Loan | null>;
  findActiveLoansByUserId(userId: string): Promise<Loan[]>; //what books has a person taken
  findActiveLoanByBookId(bookId: string): Promise<Loan | null>; // who has taken a particular book

  update(
    loanId: string,
    loanData: Partial<Omit<Loan, "loanId">>
  ): Promise<Loan | null>;
}
