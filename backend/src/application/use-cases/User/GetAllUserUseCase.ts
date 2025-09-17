import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../repositories/IUserRepository.js";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
