export interface UsersCreateData {
  avatar_url: string;
  login: string;
  github_id: number;
  name: string;
}

export interface UsersRepository {
  create: (data: UsersCreateData) => Promise<any>;
  findFirst: (github_id: number) => Promise<any>;
}