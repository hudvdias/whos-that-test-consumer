export interface PointrPoints {
  question: string;
  answer: string;
  createdAt: string;
}

export interface PointrDraft {
  id: string;
  userId: string;
  userKey: string;
  answersRequired: number;
  redirectUrl: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DraftUrl {
  url: string;
  draftId: string;
}

export interface Draft extends PointrDraft, DraftUrl {
  points?: PointrPoints[];
}
