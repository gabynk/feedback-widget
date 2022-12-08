import axios from "axios";
import { sign } from "jsonwebtoken";
import { UsersRepository } from "../../repositories/UsersRepository";

interface IAccessTokenResponse {
  access_token: string;
}

export interface UserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UsersRepository,
  ) { }

  async authenticateInGithub(code: string) {
    const GITHUB_URL = process.env.GITHUB_URL as string;

    const response = await axios.post<IAccessTokenResponse>(GITHUB_URL, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    });

    if (response?.data) {
      const { data: accessTokenResponse } = response;

      const user = await axios.get<UserResponse>("https://api.github.com/user", {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`
        }
      });

      return user.data;
    }

    return null;
  }

  async execute(code: string) {
    if (!code) {
      throw new Error('Invalid token.');
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const userDataInGithub = await this.authenticateInGithub(code);

    if (!userDataInGithub) {
      throw new Error('Error connecting with git.');
    }

    const { login, id, avatar_url, name } = userDataInGithub as UserResponse;

    let user = await this.userRepository.findFirst(id);

    if (!user) {
      user = await this.userRepository.create({
        github_id: id,
        login,
        avatar_url,
        name
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        },
      },
      JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return { token, user };
  }
}