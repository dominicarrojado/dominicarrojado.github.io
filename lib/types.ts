import { HTMLAttributes, ReactNode } from 'react';

export enum SocialName {
  LINKEDIN = 'linkedin',
  GITHUB = 'github',
  EMAIL = 'email',
}

export type Social = {
  name: SocialName;
  title: string;
  url: string;
  icon: (props: HTMLAttributes<SVGElement>) => ReactNode;
  copyOnClick: boolean;
};

export type Quote = {
  quote: string;
  author: string;
};
