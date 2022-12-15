import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackListData, FeedbacksRepository } from "../FeedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  }

  async list({ type, take, skip }: FeedbackListData) {
    return await prisma.feedback.findMany({
      take,
      skip,
      where: {
        type: {
          contains: type,
        },
      },
      orderBy: {
        type: 'asc'
      }
    });
  }
}