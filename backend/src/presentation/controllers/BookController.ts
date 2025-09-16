import { Request, Response } from "express";
import { AddBookUseCase } from "../../application/use-cases/Book/AddBookUseCase";
import { DeleteBookUseCase } from "../../application/use-cases/Book/DeleteBookUseCase";
import { GetAllBooksUseCase } from "../../application/use-cases/Book/GetAllBooksUseCase";
import { UpdateBookDetailsUseCase } from "../../application/use-cases/Book/UpdateBookDetailsUseCase";
import { GetBookByIdUseCase } from "../../application/use-cases/Book/GetBookByIdUseCase";
import { Book } from "../../domain/entities/Book";

class BookController {
  constructor(
    private readonly addBookUseCase: AddBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly updateBookDetailsUseCase: UpdateBookDetailsUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const bookData = req.body;
      const newBook = await this.addBookUseCase.execute(bookData);
      res.status(201).json(newBook);
    } catch (error: any) {
      console.log("Book controller - Create Book Error: ", error.message);
      res
        .status(500)
        .json({ message: "Failed to create book", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.params;

      if (!bookId) {
        res.status(400).json({ message: "Book Id is mandatory" });
        return;
      }
      const book = req.body;
      const updatedBook = await this.updateBookDetailsUseCase.execute(
        bookId,
        book
      );
      res.status(200).json(updatedBook);
    } catch (error: any) {
      console.log("Book controller - Update Book Error: ", error.message);
      res
        .status(500)
        .json({ message: "Failed to update book", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.params;
      if (!bookId) {
        res.status(400).json({ message: "Book Id is required" });
        return;
      }

      await this.deleteBookUseCase.execute(bookId);
      res.status(204).send();
    } catch (error: any) {
      console.log("Book controller - Delete Book Error: ", error.message);
      res
        .status(500)
        .json({ message: "Failed to delete book", error: error.message });
    }
  }

  async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.getAllBooksUseCase.execute();
      res.status(200).json(books);
    } catch (error: any) {
      console.log("Book controller - Get All Books Error: ", error.message);
      res
        .status(500)
        .json({ message: "Failed to get all books.", error: error.message });
    }
  }

  async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.params;
      if (!bookId) {
        res.status(400).json({ message: "THe book id is required." });
        return;
      }

      const book = await this.getBookByIdUseCase.execute(bookId);
      res.status(200).json(book);
    } catch (error: any) {
      console.log("Book controller - Get Book Error: ", error.message);
      res
        .status(500)
        .json({ message: "Failed to get book", error: error.message });
    }
  }
}
