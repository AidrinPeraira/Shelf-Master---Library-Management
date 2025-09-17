import { Loan } from "../../../domain/entities/Loan.js";
import { IBookRepository } from "../../repositories/IBookRepository.js";
import { ILoanRepository } from "../../repositories/ILoanRepository.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";

export class GetUserLoansUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly loanRepository: ILoanRepository,
    private readonly bookRepository: IBookRepository
  ) {}

  async execute(userId: string): Promise<Loan[]> {
    const activeLoans = await this.loanRepository.findActiveLoansByUserId(
      userId
    );

    return activeLoans;
  }
}
