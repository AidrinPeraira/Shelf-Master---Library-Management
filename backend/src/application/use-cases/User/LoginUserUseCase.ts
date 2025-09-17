import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";
import bcrypt from "bcrypt";

export class LoginUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (!existingUser) {
      throw new Error("A user doesn't exist withthis email id");
    }

    const verified = await bcrypt.compare(password, existingUser.passwordHash);
    if (!verified) {
      throw new Error("The entered password is incorrect");
    }

    return existingUser;
  }
}
