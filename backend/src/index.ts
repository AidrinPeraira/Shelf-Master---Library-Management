import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoBookRepository } from "./infrastructure/repositories/MongoBookRepository.js";
import { AddBookUseCase } from "./application/use-cases/Book/AddBookUseCase.js";
import { connectToDatabase } from "./infrastructure/database/mongo.js";
import { DeleteBookUseCase } from "./application/use-cases/Book/DeleteBookUseCase.js";
import { UpdateBookDetailsUseCase } from "./application/use-cases/Book/UpdateBookDetailsUseCase.js";
import { GetAllBooksUseCase } from "./application/use-cases/Book/GetAllBooksUseCase.js";
import { GetBookByIdUseCase } from "./application/use-cases/Book/GetBookByIdUseCase.js";
import { createBookRouter } from "./presentation/routes/bookRoutes.js";
import { BookController } from "./presentation/controllers/BookController.js";

async function startServer() {
  dotenv.config();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  const db = await connectToDatabase();

  const bookRepository = new MongoBookRepository(db);

  const addBookUseCase = new AddBookUseCase(bookRepository);
  const deleteBookUseCase = new DeleteBookUseCase(bookRepository);
  const updateBookDetailsUseCase = new UpdateBookDetailsUseCase(bookRepository);
  const getAllBooksUseCase = new GetAllBooksUseCase(bookRepository);
  const getBookByIdUseCase = new GetBookByIdUseCase(bookRepository);

  const bookController = new BookController(
    addBookUseCase,
    deleteBookUseCase,
    getAllBooksUseCase,
    getBookByIdUseCase,
    updateBookDetailsUseCase
  );

  const bookRouter = createBookRouter(bookController);

  app.use("/api/book", bookRouter);

  const PORT = process.env.SERVER_PORT_NUMBER || 3000;
  app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
  });
}

startServer().catch((error) => {
  console.log("Error: Failed to start the server: ", error);
});
