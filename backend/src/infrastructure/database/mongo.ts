import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Shelf_Master";
let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  if (!mongoUri) {
    throw new Error("No MONGO_URI defined in environment");
  }

  const client = new MongoClient(mongoUri);
  await client.connect();

  db = client.db("Shelf_Master_DB");
  console.log("Connected to MongoDB");

  return db;
}
