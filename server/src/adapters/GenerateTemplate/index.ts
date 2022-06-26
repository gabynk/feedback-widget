export interface generateNewFeedbackData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface HandlebarsAdapter {
  generateNewFeedback: (data: generateNewFeedbackData) => Promise<string>;
}