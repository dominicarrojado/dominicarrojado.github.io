import { AxiosResponse } from 'axios';

export function getImageDataFromResponse(res: AxiosResponse) {
  return `data:${res.headers['content-type']
    .toLowerCase()
    .replace(' ', '')};base64,${Buffer.from(res.data, 'binary').toString(
    'base64'
  )}`;
}
