import { HandlebarsAdapter } from "../adapters/GenerateTemplate";
import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    private handlebarsGenerateAdapter: HandlebarsAdapter
  ) { }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type || !comment) {
      throw new Error('Invalid screenshot format.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    const newFeedbackTemplate = await this.handlebarsGenerateAdapter.generateNewFeedback({ 
      type, 
      comment, 
      screenshot 
    });

    await this.mailAdapter.sendMail({
        subject: 'Novo feedback',
        body: newFeedbackTemplate
      });
  }
}