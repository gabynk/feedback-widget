import axios from "axios"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

jest.mock("axios")

const githubUser = {
  id: 'id123',
  name: 'test-name',
  avatar_url: 'https://teste-url.com',
  login: 'test-login'
}

const usersRepositoryInMemory = new UsersRepositoryInMemory()
const authenticateUser = new AuthenticateUserUseCase(usersRepositoryInMemory)

describe('Authenticate User', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be able to authenticate user', async () => {
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({ data: { accessTokenResponse: { access_token: 'access_token' } } }))
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: githubUser }))

    await expect(authenticateUser.execute('code')).resolves.not.toThrow()
  })

  it('should be able to return user data', async () => {
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({ data: { accessTokenResponse: { access_token: 'access_token' } } }))
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: githubUser }))

    const response = await authenticateUser.execute('code')

    expect(response.user.name).toBe(githubUser.name)
    expect(response.user.avatar_url).toBe(githubUser.avatar_url)
    expect(response.user.login).toBe(githubUser.login)
  })

  it('should not be able to authenticate without code', async () => {
    await expect(authenticateUser.execute('')).rejects.toThrow('Invalid token.')
  })

  it('should not be able to authenticate with exist github user', async () => {
    axios.post = jest.fn().mockImplementation(() => Promise.resolve())
    axios.get = jest.fn().mockImplementation(() => Promise.resolve())
    
    await expect(authenticateUser.execute('code')).rejects.toThrow('Error connecting with git.')
  })
})