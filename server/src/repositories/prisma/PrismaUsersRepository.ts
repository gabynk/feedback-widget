import { prisma } from "../../prisma";
import { UsersCreateData, UsersRepository } from "../UsersRepository";

export class PrismaUsersRepository implements UsersRepository {
  async create({ login, github_id, avatar_url, name }: UsersCreateData) {
    const user = await prisma.user.create({
      data: {
        github_id,
        login,
        avatar_url,
        name
      }
    });

    return user;
  };

  async findFirst(github_id: number) {
    return prisma.user.findFirst({
      where: {
        github_id
      }
    });
  };
}