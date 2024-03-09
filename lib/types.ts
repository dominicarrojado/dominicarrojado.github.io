import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Route {
  HOME = '/',
  ABOUT = '/about',
  PROJECTS = '/projects',
  POSTS = '/posts',
  POSTS_PAGE = '/posts/page',
  PRIVACY_POLICY = '/privacy-policy',
  DISCLAIMER = '/disclaimer',
  DONATE = '/donate',
  SUBSCRIBE = '/subscribe',
  UNSUBSCRIBE = '/unsubscribe',
}

export enum SocialName {
  DONATE = 'donate',
  YOUTUBE = 'youtube',
  LINKEDIN = 'linkedin',
  GITHUB = 'github',
  EMAIL = 'email',
}

export enum PostCategory {
  TECHNOLOGY = 'technology',
}

export enum GoogleAnalyticsEvent {
  PAGE_VIEW = 'page_view',
  HEADER_BTN_CLICK = 'header_btn_click',
  THEME_BTN_CLICK = 'theme_btn_click',
  SCROLL_CLICK = 'scroll_click',
  SOCIAL_CLICK = 'social_click',
  PROJECT_CLICK = 'project_click',
  GIF_AUTO_PLAY_START = 'gif_auto_play_start',
  GIF_AUTO_PLAY_CANCEL = 'gif_auto_play_cancel',
  TESTIMONIALS_SWIPE = 'testimonials_swipe',
  MODAL_OPEN = 'modal_open',
  MODAL_CLOSE = 'modal_close',
  SUBSCRIBE_FORM_SUBMIT = 'subscribe_form_submit',
  UNSUBSCRIBE_FORM_SUBMIT = 'unsubscribe_form_submit',
}

export enum GoogleAdSenseUnit {
  POST_HEADER = '4984498713',
  POST_BODY = '3748487753',
  POST_FOOTER = '6892691691',
  POSTS_HEADER = '2766540582',
  POSTS_FOOTER = '1540540084',
}

export enum GoogleAdSenseUnitLayout {
  IN_ARTICLE = 'in-article',
}

export enum GoogleAdSenseUnitFormat {
  AUTO = 'auto',
  FLUID = 'fluid',
}

export enum InternalUrl {
  SG_ALERTS = '/sg-alerts/',
  PH_ALERTS = '/ph-alerts/',
}

export enum ExternalUrl {
  PERSONAL_PAYPAL = 'https://www.paypal.com/paypalme/DominicArrojado',
  PERSONAL_YOUTUBE = 'https://www.youtube.com/channel/UCWwV__qrzg5BYCSwO91Xhxg/videos?view=0&sort=dd',
  PERSONAL_LINKEDIN = 'https://www.linkedin.com/in/dominic-arrojado-75ba03a9/',
  PERSONAL_GITHUB = 'https://github.com/dominicarrojado/',
  PERSONAL_GITHUB_WEBSITE_ISSUES = 'https://github.com/dominicarrojado/dominicarrojado.github.io/issues',
  PROPERTY_GURU_FINANCE = 'https://www.propertyguru.com.sg/mortgage',
  PROPERTY_GURU_GROUP = 'https://www.propertygurugroup.com/',
  NETFLIX = 'https://www.netflix.com/',
  IMAGINE_DRAGONS = 'https://www.imaginedragonsmusic.com/',
  SPOTIFY_PLAYLISTS = 'https://open.spotify.com/user/dominicarrojado/playlists',
  DUOLINGO = 'https://www.duolingo.com/profile/Dominic778651',
  GITHUB = 'https://github.com/',
  GITHUB_PAGES = 'https://pages.github.com/',
  GITHUB_PAGES_PRIVACY_POLICY = 'https://docs.github.com/en/github/site-policy/github-privacy-statement#github-pages',
  METEOR = 'https://www.meteor.com/',
  METEOR_CLOUD = 'https://www.meteor.com/cloud',
  METEOR_CLOUD_PRIVACY_POLICY = 'https://cloud-guide.meteor.com/security.html',
  GOOGLE = 'https://www.google.com/',
  GOOGLE_ANALYTICS = 'https://analytics.google.com/',
  GOOGLE_ANALYTICS_POLICY = 'https://support.google.com/analytics/answer/6004245',
  GOOGLE_TAG_MANAGER = 'https://tagmanager.google.com/',
  GOOGLE_TAG_MANAGER_POLICY = 'https://support.google.com/tagmanager/answer/9323295',
  GOOGLE_ADSENSE = 'https://www.google.com/adsense/start/',
  GOOGLE_ADSENSE_POLICY = 'https://support.google.com/adsense/answer/48182',
  GOOGLE_ADSENSE_COOKIE_USE = 'https://support.google.com/adsense/answer/7549925',
  COOKIES = 'https://en.wikipedia.org/wiki/HTTP_cookie',
  FONT_AWESOME = 'https://fontawesome.com/',
  FONT_AWESOME_LICENSE = 'https://fontawesome.com/license/free',
  MICROSOFT = 'https://www.microsoft.com/',
  MICROSOFT_CLARITY = 'https://clarity.microsoft.com/',
  MICROSOFT_CLARITY_FAQ = 'https://docs.microsoft.com/en-us/clarity/faq#privacy',
  DBS_PAYLAH = 'https://www.dbs.com.sg/personal/deposits/pay-with-ease/dbs-paylah',
}

export enum ApiEndpoint {
  SUBSCRIPTION_REQUESTS = '/subscription-requests',
  SUBSCRIPTION_REQUEST_VERIFY = '/subscription-requests/:id/verify',
  SUBSCRIPTION = '/subscriptions/contact-mode/:contact-mode/topics/:topic',
}

export enum FetchState {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  NOT_FOUND = 'NOT_FOUND',
  ERROR = 'ERROR',
}

export enum TooltipPlacement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export type Nullish<T> = T | null | undefined;

export type ProjectLink = {
  title: string;
  url: string;
};

export type Project = {
  title: string;
  description: string;
  links: Array<ProjectLink>;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  gifUrl: string;
  isBest?: boolean;
};

export type Social = {
  name: SocialName;
  title: string;
  subtitle: string;
  url: string;
  icon: (props: HTMLAttributes<SVGElement>) => ReactNode;
};

export type Quote = {
  quote: string;
  author: string;
};

export type Post = {
  id: string;
  title: string;
  category: PostCategory;
  date: string;
  excerpt: string;
  videoUrl: string;
};

export type PostData = Post & {
  content: string;
  previousPost: Post | null;
  nextPost: Post | null;
};

export type Testimonial = {
  name: string;
  jobTitle: string;
  companyName: string;
  quote: string;
};
