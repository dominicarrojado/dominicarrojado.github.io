import { HTMLAttributes, ReactNode } from 'react';

export enum Route {
  HOME = '/',
  ABOUT = '/about',
  PROJECTS = '/projects',
  POSTS = '/posts',
}

export enum SocialName {
  DONATE = 'donate',
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

export enum PostCategory {
  TECHNOLOGY = 'technology',
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
  TESTIMONIALS_SWIPE = 'testimonials_swipe',
}

export enum ExternalUrl {
  PROPERTY_GURU_FINANCE = 'https://www.propertyguru.com.sg/mortgage',
  PROPERTY_GURU_GROUP = 'https://www.propertygurugroup.com/',
  NETFLIX = 'https://www.netflix.com/',
  SPOTIFY_PLAYLISTS = 'https://open.spotify.com/user/dominicarrojado/playlists',
  DUOLINGO = 'https://www.duolingo.com/profile/Dominic778651',
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
  gifUrl: string;
  isBest?: boolean;
};

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

export type Post = {
  id: string;
  title: string;
  category: PostCategory;
  date: string;
  excerpt: string;
  imageUrl: string;
};

export type PostData = Post & {
  contentHtml: string;
  previousPost: Post | null;
  nextPost: Post | null;
};

export type Testimonial = {
  order: number;
  name: string;
  jobTitle: string;
  companyName: string;
  contentHtml: string;
};
