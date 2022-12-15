import { FeedbacksRepositoryInMemory } from "../../repositories/in-memory/FeedbacksRepositoryInMemory";
import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const sendMailSpy = jest.fn()
const generateNewFeedbackSpy = jest.fn()

const feedbacksRepositoryInMemory = new FeedbacksRepositoryInMemory();
const submitFeedback = new SubmitFeedbackUseCase(
  feedbacksRepositoryInMemory,
  { sendMail: sendMailSpy },
  { generateNewFeedback: generateNewFeedbackSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test'
    })).resolves.not.toThrow()

    expect(sendMailSpy).toBeCalled()
    expect(generateNewFeedbackSpy).toBeCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,test'
    })).rejects.toThrow('Invalid screenshot format.')
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,test'
    })).rejects.toThrow('Invalid screenshot format.')
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.png'
    })).rejects.toThrow('Invalid screenshot format.')
  })
})