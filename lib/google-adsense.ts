import { checkIsLocalhost } from './location';

declare global {
  interface Window {
    adsbygoogle: Array<{}>;
  }
}

export function displayAd() {
  if (checkIsLocalhost()) {
    return;
  }

  window.adsbygoogle = Array.isArray(window.adsbygoogle)
    ? window.adsbygoogle
    : [];
  window.adsbygoogle.push({});
}
