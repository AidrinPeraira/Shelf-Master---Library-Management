import { Collection, Db, ObjectId } from "mongodb";
import { Loan } from "../../domain/entities/Loan.js";
import { ILoanRepository } from "../../application/repositories/ILoanRepository.js";

type loanInputData = Omit<Loan, "loanId">;

export class MongoLoanRepository implements ILoanRepository {
  private readonly collection: Collection<loanInputData>;

  constructor(db: Db) {
    this.collection = db.collection<loanInputData>("loan");
  }

  async create(loanInputData: Omit<Loan, "loanId">): Promise<Loan> {
    const newLoan = await this.collection.insertOne(loanInputData);
    return { loanId: newLoan.insertedId.toHexString(), ...loanInputData };
  }

  async update(
    loanId: string,
    loanData: Partial<Omit<Loan, "loanId">>
  ): Promise<Loan | null> {
    const loan = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(loanId) },
      { $set: loanData },
      { returnDocument: "after" }
    );

    if (!loan) return null;
    const { _id, ...rest } = loan;
    return { loanId: _id.toHexString(), ...rest };
  }

  async findActiveLoanByBookId(bookId: string): Promise<Loan | null> {
    const loan = await this.collection.findOne({
      bookId: bookId,
      returnDate: { $exists: false },
    });

    if (!loan) return null;

    const { _id, ...rest } = loan;

    return { loanId: _id.toHexString(), ...rest };
  }

  async findActiveLoansByUserId(userId: string): Promise<Loan[]> {
    const loans = await this.collection
      .find({
        userId: userId,
        returnDate: {
          $exists: false,
        },
      })
      .toArray();

    return loans.map(({ _id, ...rest }) => ({
      loanId: _id.toHexString(),
      ...rest,
    }));
  }

  async findById(loanId: string): Promise<Loan | null> {
    const loan = await this.collection.findOne({ _id: new ObjectId(loanId) });

    if (!loan) return null;

    const { _id, ...rest } = loan;
    return { loanId: _id.toHexString(), ...rest };
  }
}
