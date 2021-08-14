import SvgEnvelope from '../components/svgEnvelope';
import SvgGitHub from '../components/svgGitHub';
import SvgLinkedIn from '../components/svgLinkedIn';
import { Quote, Route, Social, SocialName, Project } from './types';

export const MAIN_TITLE = 'Dominic Arrojado';
export const MAIN_URL = 'https://dominicarrojado.com';
export const ROUTES = Object.values(Route);
export const SCROLL_DOWN_DURATION = 1500;
export const POSTS_DISPLAY_LATEST_MAX = 4;

export const FONTS = [
  'Roboto-Light',
  'Roboto-LightItalic',
  'Roboto-Regular',
  'Roboto-Italic',
  'Roboto-Medium',
  'Roboto-MediumItalic',
  'Roboto-Bold',
  'Roboto-BoldItalic',
];
export const EXTERNAL_LINK_ATTRIBUTES = {
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
};

export const PROJECTS: Array<Project> = [
  {
    title: 'THX Spatial Audio',
    description:
      'Web-based desktop application that delivers advanced 7.1 surround sound with pinpoint positional accuracy to make your game come alive.',
    links: [
      {
        title: 'Download App',
        url: 'https://www.razer.com/thx-spatial-audio',
      },
    ],
    imageUrl: '/images/projects/thx-spatial-audio-web-app.png',
    gifUrl: '/images/projects/thx-spatial-audio-web-app.gif',
  },
  {
    title: 'Razer Training Mode: Virus Edition',
    description:
      'Whack-a-mole mini-game where you whack viruses instead of moles.',
    links: [
      {
        title: 'Play Game',
        url: 'https://dominicarrojado.com/mouse-accuracy-game/',
      },
    ],
    imageUrl: '/images/projects/razer-training-mode-virus-edition-app.png',
    gifUrl: '/images/projects/razer-training-mode-virus-edition-app.gif',
  },
  {
    title: 'Razer Chroma Studio Web',
    description:
      'A module of Razer Synapse recreated in web that allows you to create various lighting effects and synchronize across multiple devices, while allowing you to follow the exact placement of your devices on your desktop.',
    links: [
      {
        title: 'Watch Demo',
        url: 'https://youtu.be/kFBe_wSwIMQ',
      },
    ],
    imageUrl: '/images/projects/razer-chroma-studio-web-app.png',
    gifUrl: '/images/projects/razer-chroma-studio-web-app.gif',
    isBest: true,
  },
  {
    title: 'Razer Streamer Companion App',
    description:
      'Web-based desktop application where you can create unique audience interactions with supported Razer hardware.',
    links: [
      {
        title: 'Download App',
        url: 'https://www.razer.com/streamer-companion-app/',
      },
    ],
    imageUrl: '/images/projects/razer-streamer-companion-web-app.png',
    gifUrl: '/images/projects/razer-streamer-companion-web-app.gif',
  },
  {
    title: 'Razer 7.1 Surround Sound',
    description:
      'Web-based desktop application for superior positional audio and a lifelike gaming experience.',
    links: [
      {
        title: 'Download App',
        url: 'https://www.razer.com/7.1-surround-sound/',
      },
    ],
    imageUrl: '/images/projects/razer-7.1-surround-sound-web-app.png',
    gifUrl: '/images/projects/razer-7.1-surround-sound-web-app.gif',
  },
  {
    title: 'Razer Developer Portal',
    description:
      'A portal for third-party developers to manage their projects that uses Razer ID API.',
    links: [
      {
        title: 'View Web App',
        url: 'https://api.razer.com/',
      },
    ],
    imageUrl: '/images/projects/razer-developer-portal-web-app.png',
    gifUrl: '/images/projects/razer-developer-portal-web-app.gif',
  },
  {
    title: 'Razer ID',
    description:
      'Profile management and authentication service tool for all Razer services. Built for web, desktop and mobile.',
    links: [
      {
        title: 'View Web App',
        url: 'https://razerid.razer.com/',
      },
    ],
    imageUrl: '/images/projects/razer-id-web-app.png',
    gifUrl: '/images/projects/razer-id-web-app.gif',
  },
  {
    title: 'Qwerk',
    description:
      'Project management + chat tool for productivity. It has notes and timer feature as well.',
    links: [
      {
        title: 'View Web App',
        url: 'https://www.justqwerk.com/',
      },
    ],
    imageUrl: '/images/projects/qwerk-web-app.png',
    gifUrl: '/images/projects/qwerk-web-app.gif',
    isBest: true,
  },
  {
    title: 'Maybank: FC Barcelona',
    description:
      "Website for Maybank to introduce its FC Barcelona Visa Signature Card. Maybank is one of the world's most valuable bank brands.",
    links: [
      {
        title: 'View Website',
        url: 'https://dominicarrojado.com/maybank-fc-barcelona-website/',
      },
    ],
    imageUrl: '/images/projects/maybank-fc-barcelona-website.png',
    gifUrl: '/images/projects/maybank-fc-barcelona-website.gif',
  },
  {
    title: 'Food Republic: Capsule Surprise',
    description:
      "A classic game for Food Republic's Wisma Atria re-opening. Food Republic is a food court chain run by the BreadTalk Group based in Singapore.",
    links: [
      {
        title: 'View Web App',
        url: 'https://food-republic-capsule-surprise.meteorapp.com/',
      },
    ],
    imageUrl: '/images/projects/food-republic-capsule-surprise-web-app.png',
    gifUrl: '/images/projects/food-republic-capsule-surprise-web-app.gif',
  },
  {
    title: "Aptamil: Build Your Baby's Foundation to be One Step Ahead",
    description:
      'Campaign for Aptamil to promote the 2 key pillars of foundation: natural defences and brain development.',
    links: [
      {
        title: 'View Web App',
        url: 'https://aptamil-bybftbosa.meteorapp.com/',
      },
    ],
    imageUrl:
      '/images/projects/aptamil-build-your-babys-foundation-web-app.png',
    gifUrl: '/images/projects/aptamil-build-your-babys-foundation-web-app.gif',
  },
  {
    title: 'Kronenbourg 1664',
    description:
      'Website for the most sold French beer in the world and the market leader for high-end premium beers.',
    links: [
      {
        title: 'View Website',
        url: 'https://dominicarrojado.com/kronenbourg-website/',
      },
    ],
    imageUrl: '/images/projects/kronenbourg-website.png',
    gifUrl: '/images/projects/kronenbourg-website.gif',
  },
  {
    title: 'Singtel: Data x Infinity',
    description:
      "Web app for Singtel's event promoting new mobile data add-on. Singtel is one of the four major telcos operating in  Singapore",
    links: [
      {
        title: 'View Web App',
        url: 'https://singtel-data-x-infinity.meteorapp.com/',
      },
      {
        title: 'View Slideshow',
        url: 'https://singtel-data-x-infinity-ss.meteorapp.com/',
      },
    ],
    imageUrl: '/images/projects/singtel-data-x-infinity-web-app.png',
    gifUrl: '/images/projects/singtel-data-x-infinity-web-app.gif',
  },
  {
    title: 'CNB: Anti Drug Abuse Campaign',
    description:
      'Campaign that aims to raise awareness and support for the anti-drug cause in Singapore.',
    links: [
      {
        title: 'View Web App',
        url: 'https://cnb-adac.meteorapp.com/',
      },
      {
        title: 'View Slideshow',
        url: 'https://cnb-adac-ss.meteorapp.com/',
      },
    ],
    imageUrl: '/images/projects/cnb-anti-drug-abuse-campaign-web-app.png',
    gifUrl: '/images/projects/cnb-anti-drug-abuse-campaign-web-app.gif',
  },
  {
    title: 'Hashtag Interactive',
    description:
      'Website for a boutique digital marketing agency that is optimised for a digital-centric world.',
    links: [
      {
        title: 'View Website',
        url: 'https://www.hashtag-interactive.com/',
      },
    ],
    imageUrl: '/images/projects/hashtag-interactive-website.png',
    gifUrl: '/images/projects/hashtag-interactive-website.gif',
  },
  {
    title: 'To My Valentine',
    description:
      "Valentine's day card app that lets you send cute e-cards to your special someone.",
    links: [
      {
        title: 'View Web App',
        url: 'https://hashtag-interactive-tmv.meteorapp.com/',
      },
    ],
    imageUrl:
      '/images/projects/hashtag-interactive-to-my-valentine-web-app.png',
    gifUrl: '/images/projects/hashtag-interactive-to-my-valentine-web-app.gif',
  },
  {
    title: 'CNY: Fortune Teller',
    description:
      "Quirky lil' 2017 horoscope app to see what the Year of the Rooster has in store for you.",
    links: [
      {
        title: 'View Web App',
        url: 'https://hashtag-interactive-cny.meteorapp.com/',
      },
    ],
    imageUrl:
      '/images/projects/hashtag-interactive-cny-fortune-teller-web-app.png',
    gifUrl:
      '/images/projects/hashtag-interactive-cny-fortune-teller-web-app.gif',
  },
  {
    title: 'Holly Jolly Memory Game',
    description:
      'Simon-inspired memory game for Christmas by Hashtag Interactive.',
    links: [
      {
        title: 'Play Game',
        url: 'https://hashtag-interactive-christmas.meteorapp.com/',
      },
    ],
    imageUrl:
      '/images/projects/hashtag-interactive-holly-jolly-memory-game-web-app.png',
    gifUrl:
      '/images/projects/hashtag-interactive-holly-jolly-memory-game-web-app.gif',
  },
  {
    title: 'Welcome to Hashtag!',
    description:
      'HTML email template to welcome new Hashtag Interactive clients.',
    links: [
      {
        title: 'View Email Template',
        url: 'https://dominicarrojado.com/hashtag-interactive-welcome-edm/',
      },
    ],
    imageUrl: '/images/projects/hashtag-interactive-welcome-email-template.png',
    gifUrl: '/images/projects/hashtag-interactive-welcome-email-template.gif',
  },
  {
    title: 'M1 Email Templates',
    description:
      'HTML email templates for M1, one of the four major telcos operating in  Singapore.',
    links: [
      {
        title: 'View Data Passport I',
        url: 'https://dominicarrojado.com/m1-data-passport-edm/',
      },
      {
        title: 'View Data Passport II',
        url: 'https://dominicarrojado.com/m1-data-passport-2-edm/',
      },
      {
        title: 'View Data Passport III',
        url: 'https://dominicarrojado.com/m1-data-passport-3-edm/',
      },
      {
        title: 'View Data Passport IV',
        url: 'https://dominicarrojado.com/m1-data-passport-4-edm/',
      },
    ],
    imageUrl: '/images/projects/m1-email-template.png',
    gifUrl: '/images/projects/m1-email-template.gif',
  },
  {
    title: 'AXA Email Templates',
    description:
      "HTML email templates for AXA, one of the world's leading insurance companies.",
    links: [
      {
        title: 'View Smart Travel I',
        url: 'https://dominicarrojado.com/axa-smart-travel-edm/',
      },
      {
        title: 'View Smart Travel II',
        url: 'https://dominicarrojado.com/axa-smart-travel-2-edm/',
      },
      {
        title: "View Mother's Day",
        url: 'https://dominicarrojado.com/axa-mothers-day-edm/',
      },
      {
        title: 'View Shield',
        url: 'https://dominicarrojado.com/axa-shield-edm/',
      },
      {
        title: 'View SmartHome',
        url: 'https://dominicarrojado.com/axa-smart-home-edm/',
      },
      {
        title: 'View Singtel Partnership',
        url: 'https://dominicarrojado.com/axa-singtel-edm/',
      },
      {
        title: 'View September Promo',
        url: 'https://dominicarrojado.com/axa-september-promo-edm/',
      },
    ],
    imageUrl: '/images/projects/axa-email-template.png',
    gifUrl: '/images/projects/axa-email-template.gif',
  },
];
export const BEST_PROJECTS = PROJECTS.filter(({ isBest }) => isBest);

export const SOCIAL_LINKS: Array<Social> = [
  {
    name: SocialName.LINKEDIN,
    title: 'Connect with me @ LinkedIn!',
    url: 'https://www.linkedin.com/in/dominic-arrojado-75ba03a9/',
    icon: SvgLinkedIn,
    shouldCopyOnClick: false,
  },
  {
    name: SocialName.GITHUB,
    title: 'Follow me @ GitHub!',
    url: 'https://github.com/dominicarrojado/',
    icon: SvgGitHub,
    shouldCopyOnClick: false,
  },
  {
    name: SocialName.EMAIL,
    title: 'Email me!',
    url: 'mailto:dominicarrojado@gmail.com',
    icon: SvgEnvelope,
    shouldCopyOnClick: true,
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

export const MENU_ITEMS = [
  {
    path: Route.HOME,
    title: 'Home',
  },
  {
    path: Route.ABOUT,
    title: 'About Me',
  },
  {
    path: Route.PROJECTS,
    title: 'Projects',
  },
  {
    path: Route.POSTS,
    title: 'Blog',
  },
];
