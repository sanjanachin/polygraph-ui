import {
  MisinformationCheckRequest,
  MisinformationCheckResponse,
} from './apiTypes';
import { MISINFORMATION_CHECK_ENDPOINT } from './endpoints';

function checkMisinformation(
  data: MisinformationCheckRequest
): Promise<MisinformationCheckResponse> {
  return fetch(MISINFORMATION_CHECK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<MisinformationCheckResponse>;
  });
}

export default checkMisinformation;
