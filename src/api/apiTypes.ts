export type MisinformationCheckRequest = {
  user: string;
  text: string;
};

export type MisinformationCheckResponse = {
  valid: boolean;
};

export type UserHistoryRequest = {
  user: string;
};

export type UserHistoryResponse = {
  history: UserHistoryItem[];
};

export type UserHistoryItem = {
  text: string;
  valid: boolean;
};
