import { Book } from "../../domain/entities/Book";

/**
 * This interface is a "wishlist."
 * It clearly states the functions
 * we need for managing books (create,
 * findById, etc.). It does not contain
 * any database logic. The actual
 * MongoDB code will be written later
 * in the Infrastructure layer
 */
export interface IBookRepository {
  create(book: Omit<Book, "bookId">): Promise<Book>;

  /**
   * Omit<Book, 'bookId'>: This is a TypeScript utility.
   * When creating a new book, we don't have the bookId
   * yet; the database will generate it. Omit creates a
   * new type that is the same as Book but without the
   * bookId property, which is exactly what we need for
   * the input of our create method.
   */

  findById(bookId: string): Promise<Book | null>;

  findAll(): Promise<Book[]>;

  update(
    bookId: string,
    book: Partial<Omit<Book, "bookId">>
  ): Promise<Book | null>;

  delete(bookId: string): Promise<void>;
}
