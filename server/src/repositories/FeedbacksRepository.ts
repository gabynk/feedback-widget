export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackListData {
  type?: string;
  take: number;
  skip: number;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  list: (data: FeedbackListData) => {};
}