import { FeedbacksRepository } from "../../repositories/FeedbacksRepository";

interface ListFeedbackUseCaseRequest {
  type?: string;
  offset?: string;
  limit?: string;
}

export class ListFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
  ) { }

  async execute({ type, offset, limit }: ListFeedbackUseCaseRequest) {
    const take = !!limit && !!Number(limit) ? Number(limit) : 10; 
    const skip = !!offset && !!Number(offset) ? Number(offset) : 0; 

    const feedbacks = this.feedbacksRepository.list({ type, take, skip })

    return feedbacks;
  }
}