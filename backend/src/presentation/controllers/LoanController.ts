import { Request, Response } from "express";
import { LendBookUseCase } from "../../application/use-cases/Loan/LendBookUseCase.js";
import { ReturnBookUseCase } from "../../application/use-cases/Loan/ReturnBookUseCase.js";

export class LoanController {
  constructor(
    private readonly lendBookUseCase: LendBookUseCase,
    private readonly returnBookUseCase: ReturnBookUseCase
  ) {}

  async lend(req: Request, res: Response): Promise<void> {
    try {
      const { bookId, userId } = req.body;
      const newLoan = await this.lendBookUseCase.execute(bookId, userId);
      res.status(201).json(newLoan);
    } catch (error: any) {
      console.log("Error lending book: ", error.message);
      res
        .status(500)
        .json({ message: "Error lending book to user", error: error.message });
    }
  }

  async return(req: Request, res: Response) {
    try {
      const { bookId } = req.body;
      const updatedLoan = await this.returnBookUseCase.execute(bookId);
      res.status(200).json(updatedLoan);
    } catch (error: any) {
      console.log("Error returning book: ", error.message);
      res
        .status(500)
        .json({ message: "Error returning book.", error: error.message });
    }
  }
}
