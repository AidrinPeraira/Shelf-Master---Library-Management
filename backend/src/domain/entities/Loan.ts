export interface Loan {
  loanId: string;
  bookId: string;
  userId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
}
