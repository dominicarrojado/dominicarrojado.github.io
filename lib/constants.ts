import SvgEnvelope from '../components/svgEnvelope';
import SvgGitHub from '../components/svgGitHub';
import SvgLinkedIn from '../components/svgLinkedIn';
import { Quote, Social, SocialName } from './types';

export const MAIN_TITLE = 'Dominic Arrojado';
export const MAIN_URL = 'https://dominicarrojado.com';
export const SCROLL_DOWN_DURATION = 2000;

export const SOCIAL_LINKS: Array<Social> = [
  {
    name: SocialName.LINKEDIN,
    title: 'Connect with me @ LinkedIn!',
    url: 'https://www.linkedin.com/in/dominic-arrojado-75ba03a9/',
    icon: SvgLinkedIn,
    copyOnClick: false,
  },
  {
    name: SocialName.GITHUB,
    title: 'Follow me @ GitHub!',
    url: 'https://github.com/dominicarrojado/',
    icon: SvgGitHub,
    copyOnClick: false,
  },
  {
    name: SocialName.EMAIL,
    title: 'Email me!',
    url: 'mailto:dominicarrojado@gmail.com',
    icon: SvgEnvelope,
    copyOnClick: true,
  },
];

export const QUOTES_INTERVAL = 6000;
export const QUOTES: Array<Quote> = [
  {
    quote: 'If there is no struggle, there is no progress.',
    author: 'Frederick Douglass',
  },
  {
    quote:
      "It's okay to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.",
    author: 'Steve McConnell',
  },
  {
    quote:
      "If you can't explain it simply, you don't understand it well enough.",
    author: 'Albert Einstein',
  },
  {
    quote: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
  },
];
export const QUOTES_LENGTH = QUOTES.length;
