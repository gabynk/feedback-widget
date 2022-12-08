import { User } from "@prisma/client";
import * as crypto from 'crypto';
import { UsersCreateData, UsersRepository } from "../UsersRepository";

export class UsersRepositoryInMemory implements UsersRepository {
  users: User[] = [];

  async create({ login, github_id, avatar_url, name }: UsersCreateData) {
    const id = crypto.randomUUID()
    this.users.push({
      id,
      login, 
      github_id, 
      avatar_url, 
      name
    })

    return {
      id,
      login, 
      github_id, 
      avatar_url, 
      name
    };
  };

  async findFirst(github_id: number) {
    return this.users.find(
      (user) => user.github_id === github_id
    );
  };
}