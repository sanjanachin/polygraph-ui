export type MisinformationCheckRequest = {
  text: string;
};

export type MisinformationCheckResponse = {
  valid: boolean;
};

export type UserHistoryRequest = {
  user: string; // TODO: This is probably not what the request should look like
};

export type UserHistoryResponse = {
  queries: UserHistoryItem[];
};

export type UserHistoryItem = {
  text: string;
  valid: boolean;
};
