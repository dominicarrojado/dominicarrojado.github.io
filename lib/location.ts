import { MAIN_URL } from './constants';

export function checkIsLocalhost() {
  return window.location.hostname === 'localhost';
}

export function checkIsUrlInternal(url: string) {
  return url.startsWith(MAIN_URL);
}
