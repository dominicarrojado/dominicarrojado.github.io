import { GoogleAnalyticsEvents, SocialName } from './types';
import { checkIsLocalhost } from './location';

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

type EventPageView = {
  event: GoogleAnalyticsEvents.PAGE_VIEW;
};

type EventHeaderMenuHover = {
  event: GoogleAnalyticsEvents.HEADER_BTN_HOVER;
  hoverText: string;
};

type EventHeaderMenuClick = {
  event: GoogleAnalyticsEvents.HEADER_BTN_CLICK;
  linkText: string;
};

type EventScrollDownHover = {
  event: GoogleAnalyticsEvents.SCROLL_HOVER;
  hoverText: string;
};

type EventScrollDownClick = {
  event: GoogleAnalyticsEvents.SCROLL_CLICK;
  linkText: string;
};

type EventSocialHover = {
  event: GoogleAnalyticsEvents.SOCIAL_HOVER;
  socialName: SocialName;
  hoverText: string;
  hoverUrl: string;
};

type EventSocialClick = {
  event: GoogleAnalyticsEvents.SOCIAL_CLICK;
  socialName: SocialName;
  linkText: string;
  linkUrl: string;
};

type EventProjectHover = {
  event: GoogleAnalyticsEvents.PROJECT_HOVER;
  projectTitle: string;
  hoverText: string;
  hoverUrl: string;
};

type EventProjectClick = {
  event: GoogleAnalyticsEvents.PROJECT_CLICK;
  projectTitle: string;
  linkText: string;
  linkUrl: string;
};

type EventProjectInfoHover = {
  event: GoogleAnalyticsEvents.PROJECT_INFO_HOVER;
  projectTitle: string;
  hoverText: string;
};

type EventGifAutoPlayStart = {
  event: GoogleAnalyticsEvents.GIF_AUTO_PLAY_START;
  projectTitle: string;
  gifLoadTime: number;
};

type EventGifAutoPlayCancel = {
  event: GoogleAnalyticsEvents.GIF_AUTO_PLAY_CANCEL;
  projectTitle: string;
  gifCancelTime: number;
  gifCancelProgress: number;
};

type EventTestimonialsSwipe = {
  event: GoogleAnalyticsEvents.TESTIMONIALS_SWIPE;
};

export function trackEvent(
  data:
    | EventPageView
    | EventHeaderMenuHover
    | EventHeaderMenuClick
    | EventScrollDownHover
    | EventScrollDownClick
    | EventSocialHover
    | EventSocialClick
    | EventProjectHover
    | EventProjectClick
    | EventProjectInfoHover
    | EventGifAutoPlayStart
    | EventGifAutoPlayCancel
    | EventTestimonialsSwipe
) {
  if (checkIsLocalhost()) {
    return;
  }

  window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  window.dataLayer.push(data);
}
