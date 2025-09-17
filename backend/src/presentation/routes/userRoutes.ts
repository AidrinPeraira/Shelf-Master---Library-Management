import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export function createUserRouter(userController: UserController) {
  const router = Router();

  router.post("/register", (req, res) => userController.create(req, res));
  router.post("/login", (req, res) => userController.login(req, res));

  return router;
}
