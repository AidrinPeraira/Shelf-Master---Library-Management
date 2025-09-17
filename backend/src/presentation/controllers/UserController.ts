import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/User/CreateUserUseCase.js";
import { LoginUserUseCase } from "../../application/use-cases/User/LoginUserUseCase.js";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      let { name, email, password, role } = req.body;
      if (!role) role = "lender";
      const newUser = await this.createUserUseCase.execute({
        name,
        email,
        password,
        role,
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      console.log("Error creating user: ", error.message);
      res
        .status(500)
        .json({ message: "Error creaeting user.", error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.loginUserUseCase.execute(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      console.log("Error logging in user: ", error.message);
      res
        .status(500)
        .json({ message: "Error logging user in.", eroor: error.message });
    }
  }
}
