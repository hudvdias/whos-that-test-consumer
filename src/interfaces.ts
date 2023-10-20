export interface WTOnboarding {
  id: string;
  link: string;
  started_at: string;
  completed_at: string;
  api_token_id: string;
  user_id: string;
  user: WTUser;
}

export interface WTUser {
  id: string;
  first_name: string;
  last_name: string;
  points: WTPoint[];
}

export interface WTPoint {
  id: string;
  answer: string;
  question_id: string;
  question: WTQuestion;
}

export interface WTQuestion {
  id: string;
  text: string;
  order: number;
}
