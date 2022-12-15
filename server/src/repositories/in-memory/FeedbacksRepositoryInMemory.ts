import { Feedback } from "@prisma/client";
import * as crypto from 'crypto';
import { FeedbackCreateData, FeedbackListData, FeedbacksRepository } from "../FeedbacksRepository";

export class FeedbacksRepositoryInMemory implements FeedbacksRepository {
  feedbacks: Feedback[] = [];

  async create({ type, comment, screenshot }: FeedbackCreateData) {
    const id = crypto.randomUUID()
    this.feedbacks.push({
      id,
      type,
      comment,
      screenshot: screenshot ?? ''
    })
  }

  async list({ type, take, skip }: FeedbackListData) {
    return this.feedbacks.find(
      (feedback, index) => index >= skip && index <= (index + take)
    );
  }
}