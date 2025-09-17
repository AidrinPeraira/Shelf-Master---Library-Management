import { Router } from "express";
import { LoanController } from "../controllers/LoanController.js";

export function createLoanRouter(loanController: LoanController) {
  const router = Router();

  router.post("/", (req, res) => loanController.lend(req, res));
  router.put("/return", (req, res) => loanController.return(req, res));

  return router;
}
