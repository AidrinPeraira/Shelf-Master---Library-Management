import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}
