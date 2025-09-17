import { User, UserRole } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import bcrypt from "bcrypt";

interface userDataInput {
  //htis is only for the input data
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepositry: IUserRepository) {}

  async execute(user: userDataInput): Promise<User> {
    const existingUser = await this.userRepositry.findByEmail(user.email);
    if (existingUser) {
      throw new Error("A user with this email id has already been registerd");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepositry.create({
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: hashedPassword,
    });

    return newUser;
  }
}
