import { User } from "../../domain/entities/User.js";

//this defines the functions a repository, that talks with the schema, should have
export interface IUserRepository {
  create(user: Omit<User, "userId">): Promise<User>;

  findById(userId: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findAll(): Promise<User[]>;
}
