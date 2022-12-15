import { FeedbacksRepositoryInMemory } from "../../repositories/in-memory/FeedbacksRepositoryInMemory";
import { SubmitFeedbackUseCase } from "../SubmitFeedbackUseCase/SubmitFeedbackUseCase";
import { ListFeedbackUseCase } from "./ListFeedbackUseCase";

const sendMailSpy = jest.fn()
const generateNewFeedbackSpy = jest.fn()

const feedbacksRepositoryInMemory = new FeedbacksRepositoryInMemory();
const submitFeedback = new SubmitFeedbackUseCase(
  feedbacksRepositoryInMemory,
  { sendMail: sendMailSpy },
  { generateNewFeedback: generateNewFeedbackSpy }
)
const listFeedbackUseCase = new ListFeedbackUseCase(feedbacksRepositoryInMemory)

describe('List Feedback', () => {
  it('should be able to list feedback', async () => {
    const type = 'BUG'
    const offset = '0'
    const limit = '5'

    await submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test'
    })

    await expect(listFeedbackUseCase.execute({ type, offset, limit })).resolves.not.toThrow()
  })

  it('should be able to list feedback without offset', async () => {
    const type = 'BUG'
    const offset = 'test'
    const limit = '5'

    await submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test'
    })

    await expect(listFeedbackUseCase.execute({ type, offset, limit })).resolves.not.toThrow()
  })

  it('should be able to list feedback without limit', async () => {
    const type = 'BUG'
    const offset = '0'
    const limit = ''

    await submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test'
    })

    await expect(listFeedbackUseCase.execute({ type, offset, limit })).resolves.not.toThrow()
  })
})