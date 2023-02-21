import {
  MisinformationCheckRequest,
  MisinformationCheckResponse,
  UserHistoryRequest,
  UserHistoryResponse,
} from './apiTypes';
import { MISINFORMATION_CHECK_ENDPOINT, HISTORY_ENDPOINT } from './endpoints';

export function checkMisinformation(
  requestData: MisinformationCheckRequest
): Promise<MisinformationCheckResponse> {
  return fetch(MISINFORMATION_CHECK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<MisinformationCheckResponse>;
  });
}

export function getUserHistory(
  requestData: UserHistoryRequest
): Promise<UserHistoryResponse> {
  return fetch(HISTORY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<UserHistoryResponse>;
  });
}
