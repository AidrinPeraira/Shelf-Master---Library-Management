import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AddBookUseCase } from "./application/use-cases/Book/AddBookUseCase.js";
import { connectToDatabase } from "./infrastructure/database/mongo.js";
import { DeleteBookUseCase } from "./application/use-cases/Book/DeleteBookUseCase.js";
import { UpdateBookDetailsUseCase } from "./application/use-cases/Book/UpdateBookDetailsUseCase.js";
import { GetAllBooksUseCase } from "./application/use-cases/Book/GetAllBooksUseCase.js";
import { GetBookByIdUseCase } from "./application/use-cases/Book/GetBookByIdUseCase.js";
import { createBookRouter } from "./presentation/routes/bookRoutes.js";
import { BookController } from "./presentation/controllers/BookController.js";
import { MongoBookRepository } from "./infrastructure/repositories/MongoBookRepository.js";
import { CreateUserUseCase } from "./application/use-cases/User/CreateUserUseCase.js";
import { MongoUserRepository } from "./infrastructure/repositories/MongoUserRepository.js";
import { LoginUserUseCase } from "./application/use-cases/User/LoginUserUseCase.js";
import { UserController } from "./presentation/controllers/UserController.js";
import { createUserRouter } from "./presentation/routes/userRoutes.js";
import { MongoLoanRepository } from "./infrastructure/repositories/MongoLoanRepository.js";
import { LendBookUseCase } from "./application/use-cases/Loan/LendBookUseCase.js";
import { ReturnBookUseCase } from "./application/use-cases/Loan/ReturnBookUseCase.js";
import { LoanController } from "./presentation/controllers/LoanController.js";
import { createLoanRouter } from "./presentation/routes/loanRoutes.js";

async function startServer() {
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  const db = await connectToDatabase();

  //repositories
  const bookRepository = new MongoBookRepository(db);
  const userRepository = new MongoUserRepository(db);
  const loanRepository = new MongoLoanRepository(db);

  //use cases
  // //book
  const addBookUseCase = new AddBookUseCase(bookRepository);
  const deleteBookUseCase = new DeleteBookUseCase(bookRepository);
  const updateBookDetailsUseCase = new UpdateBookDetailsUseCase(bookRepository);
  const getAllBooksUseCase = new GetAllBooksUseCase(bookRepository);
  const getBookByIdUseCase = new GetBookByIdUseCase(bookRepository);

  // //user
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const loginUserUseCase = new LoginUserUseCase(userRepository);

  // //loan
  const lendBookUseCase = new LendBookUseCase(
    loanRepository,
    userRepository,
    bookRepository
  );
  const returnBookUseCase = new ReturnBookUseCase(
    bookRepository,
    loanRepository
  );

  //controllers
  // // book
  const bookController = new BookController(
    addBookUseCase,
    deleteBookUseCase,
    getAllBooksUseCase,
    getBookByIdUseCase,
    updateBookDetailsUseCase
  );
  // // user
  const userControler = new UserController(createUserUseCase, loginUserUseCase);

  // // loan
  const loanController = new LoanController(lendBookUseCase, returnBookUseCase);

  //routers
  // //book
  const bookRouter = createBookRouter(bookController);
  app.use("/api/book", bookRouter);

  // //user
  const userRouter = createUserRouter(userControler);
  app.use("/api/user", userRouter);

  // //loan
  const loanRouter = createLoanRouter(loanController);
  app.use("/api/loan", loanRouter);

  const PORT = process.env.SERVER_PORT_NUMBER || 3000;
  app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
  });
}

startServer().catch((error) => {
  console.log("Error: Failed to start the server: ", error);
});
