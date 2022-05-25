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

type EventHeaderMenuHover = {
  event: GoogleAnalyticsEvent.HEADER_BTN_HOVER;
  hoverText: string;
};

type EventHeaderMenuClick = {
  event: GoogleAnalyticsEvent.HEADER_BTN_CLICK;
  linkText: string;
};

type EventThemeButtonHover = {
  event: GoogleAnalyticsEvent.THEME_BTN_HOVER;
  hoverText: string;
};

type EventThemeButtonClick = {
  event: GoogleAnalyticsEvent.THEME_BTN_CLICK;
  linkText: string;
};

type EventScrollDownHover = {
  event: GoogleAnalyticsEvent.SCROLL_HOVER;
  hoverText: string;
};

type EventScrollDownClick = {
  event: GoogleAnalyticsEvent.SCROLL_CLICK;
  linkText: string;
};

type EventSocialHover = {
  event: GoogleAnalyticsEvent.SOCIAL_HOVER;
  socialName: SocialName;
  hoverText: string;
  hoverUrl: string;
};

type EventSocialClick = {
  event: GoogleAnalyticsEvent.SOCIAL_CLICK;
  socialName: SocialName;
  linkText: string;
  linkUrl: string;
};

type EventProjectHover = {
  event: GoogleAnalyticsEvent.PROJECT_HOVER;
  projectTitle: string;
  hoverText: string;
  hoverUrl: string;
};

type EventProjectClick = {
  event: GoogleAnalyticsEvent.PROJECT_CLICK;
  projectTitle: string;
  linkText: string;
  linkUrl: string;
};

type EventProjectInfoHover = {
  event: GoogleAnalyticsEvent.PROJECT_INFO_HOVER;
  projectTitle: string;
  hoverText: string;
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

export function trackEvent(
  data:
    | EventPageView
    | EventHeaderMenuHover
    | EventHeaderMenuClick
    | EventThemeButtonHover
    | EventThemeButtonClick
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
