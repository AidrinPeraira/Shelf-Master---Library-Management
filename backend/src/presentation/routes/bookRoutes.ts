import { Router } from "express";
import { BookController } from "../controllers/BookController.js";

export function createBookRouter(bookController: BookController): Router {
  const router = Router();

  router.get("/", (req, res) => bookController.getAllBooks(req, res));
  router.post("/", (req, res) => bookController.create(req, res));
  router.get("/:bookId", (req, res) => bookController.getBookById(req, res));
  router.put("/:bookId", (req, res) => bookController.update(req, res));
  router.delete("/:bookId", (req, res) => bookController.delete(req, res));

  return router;
}
