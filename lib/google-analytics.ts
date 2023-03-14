import { GoogleAnalyticsEvent, SocialName } from './types';
import { checkIsLocalhost } from './location';

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

type EventPageView = {
  event: GoogleAnalyticsEvent.PAGE_VIEW;
};

type EventHeaderMenuClick = {
  event: GoogleAnalyticsEvent.HEADER_BTN_CLICK;
  linkText: string;
};

type EventThemeButtonClick = {
  event: GoogleAnalyticsEvent.THEME_BTN_CLICK;
  linkText: string;
};

type EventScrollDownClick = {
  event: GoogleAnalyticsEvent.SCROLL_CLICK;
  linkText: string;
};

type EventSocialClick = {
  event: GoogleAnalyticsEvent.SOCIAL_CLICK;
  socialName: SocialName;
  linkText: string;
  linkUrl: string;
};

type EventProjectClick = {
  event: GoogleAnalyticsEvent.PROJECT_CLICK;
  projectTitle: string;
  linkText: string;
  linkUrl: string;
};

type EventGifAutoPlayStart = {
  event: GoogleAnalyticsEvent.GIF_AUTO_PLAY_START;
  projectTitle: string;
  gifLoadTime: number;
};

type EventGifAutoPlayCancel = {
  event: GoogleAnalyticsEvent.GIF_AUTO_PLAY_CANCEL;
  projectTitle: string;
  gifCancelTime: number;
  gifCancelProgress: number;
};

type EventTestimonialsSwipe = {
  event: GoogleAnalyticsEvent.TESTIMONIALS_SWIPE;
};

type EventModalOpen = {
  event: GoogleAnalyticsEvent.MODAL_OPEN;
  projectTitle: string;
  modalTitle: string;
  buttonText: string;
};

type EventModalClose = {
  event: GoogleAnalyticsEvent.MODAL_CLOSE;
  projectTitle: string;
  modalTitle: string;
  buttonText: string;
};

type EventSubscribeFormSubmit = {
  event: GoogleAnalyticsEvent.SUBSCRIBE_FORM_SUBMIT;
  projectTitle: string;
  buttonText: string;
};

type EventUnsubscribeFormSubmit = {
  event: GoogleAnalyticsEvent.UNSUBSCRIBE_FORM_SUBMIT;
  projectTitle: string;
  buttonText: string;
};

export function trackEvent(
  data:
    | EventPageView
    | EventHeaderMenuClick
    | EventThemeButtonClick
    | EventScrollDownClick
    | EventSocialClick
    | EventProjectClick
    | EventGifAutoPlayStart
    | EventGifAutoPlayCancel
    | EventTestimonialsSwipe
    | EventModalOpen
    | EventModalClose
    | EventSubscribeFormSubmit
    | EventUnsubscribeFormSubmit
) {
  if (checkIsLocalhost()) {
    return;
  }

  window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  window.dataLayer.push(data);
}
