import { HTMLAttributes, ReactNode } from 'react';

export enum Route {
  HOME = '/',
  ABOUT_ME = '/about-me',
  PROJECTS = '/projects',
  POSTS = '/posts',
}

export enum SocialName {
  LINKEDIN = 'linkedin',
  GITHUB = 'github',
  EMAIL = 'email',
}

export enum TooltipPosition {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export enum GoogleAnalyticsEvents {
  HEADER_BTN_HOVER = 'header_btn_hover',
  HEADER_BTN_CLICK = 'header_btn_click',
  SCROLL_HOVER = 'scroll_hover',
  SCROLL_CLICK = 'scroll_click',
  SOCIAL_HOVER = 'social_hover',
  SOCIAL_CLICK = 'social_click',
  PROJECT_HOVER = 'project_hover',
  PROJECT_CLICK = 'project_click',
  PROJECT_INFO_HOVER = 'project_info_hover',
  GIF_AUTO_PLAY_START = 'gif_auto_play_start',
  GIF_AUTO_PLAY_CANCEL = 'gif_auto_play_cancel',
}

export type Nullish<T> = T | null | undefined;

export type Social = {
  name: SocialName;
  title: string;
  url: string;
  icon: (props: HTMLAttributes<SVGElement>) => ReactNode;
  shouldCopyOnClick: boolean;
};

export type Quote = {
  quote: string;
  author: string;
};
