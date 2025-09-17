import { IBookRepository } from "../../application/repositories/IBookRepository.js";
import { Collection, Db, ObjectId } from "mongodb";
import { Book } from "../../domain/entities/Book.js";

type bookInputData = Omit<Book, "bookId">;

export class MongoBookRepository implements IBookRepository {
  private readonly collection: Collection<bookInputData>;

  constructor(db: Db) {
    this.collection = db.collection<bookInputData>("books");
  }

  async create(bookInputData: bookInputData): Promise<Book> {
    const result = await this.collection.insertOne(bookInputData);
    return { ...bookInputData, bookId: result.insertedId.toHexString() }; //to string will also include teh text "ObjectId(...)" toHExString just gives the id string
  }

  async findById(bookId: string): Promise<Book | null> {
    const book = await this.collection.findOne({ _id: new ObjectId(bookId) });

    if (!book) return null;

    const { _id, ...rest } = book;
    return { ...rest, bookId: _id.toHexString() };
  }

  async findAll(): Promise<Book[]> {
    const books = await this.collection.find().toArray(); //find returns a cursor.  since many documents can be found. findOne returns the single document
    return books.map(({ _id, ...rest }) => {
      return { ...rest, bookId: _id.toHexString() };
    });
  }

  async update(
    bookId: string,
    book: Partial<Omit<Book, "bookId">>
  ): Promise<Book | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(bookId) },
      { $set: book },
      { returnDocument: "after" }
    );

    if (!result) return null;

    const { _id, ...rest } = result;
    return { ...rest, bookId: _id.toHexString() };
  }

  async delete(bookId: string): Promise<void> {
    await this.collection.deleteOne({ _id: new ObjectId(bookId) });
  }
}
