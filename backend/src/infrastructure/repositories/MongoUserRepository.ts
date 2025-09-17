import { Collection, Db, ObjectId } from "mongodb";
import { IUserRepository } from "../../application/repositories/IUserRepository.js";
import { User } from "../../domain/entities/User.js";

type userInputData = Omit<User, "userId">;
export class MongoUserRepository implements IUserRepository {
  private readonly collection: Collection<userInputData>;

  constructor(db: Db) {
    this.collection = db.collection<userInputData>("users");
  }

  async create(user: Omit<User, "userId">): Promise<User> {
    const newUser = await this.collection.insertOne(user);
    return { ...user, userId: newUser.insertedId.toHexString() };
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.collection.findOne({ _id: new ObjectId(userId) });

    if (!user) return null;

    const { _id, ...rest } = user;
    return { userId: _id.toHexString(), ...rest };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.collection.findOne({ email: email });
    if (!user) return null;
    const { _id, ...rest } = user;
    return { userId: user._id.toHexString(), ...rest };
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.collection.find().toArray();

    return allUsers.map(({ _id, ...rest }) => ({
      userId: _id.toHexString(),
      ...rest,
    }));
  }
}
