import SvgDonate from '../components/svgDonate';
import SvgLinkedIn from '../components/svgLinkedIn';
import SvgGitHub from '../components/svgGitHub';
import SvgEnvelope from '../components/svgEnvelope';
import SvgYouTube from '../components/svgYouTube';
import {
  DialogName,
  ExternalUrl,
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  GoogleAdSenseUnitLayout,
  Project,
  Quote,
  Route,
  Social,
  SocialName,
  Testimonial,
} from './types';

export const SITE_NAME = 'Dominic Arrojado';
export const MAIN_TITLE = 'Dominic Arrojado';
export const MAIN_DESC =
  'My name is Dominic Arrojado. I write tech blogs and create videos to share my knowledge and learnings in my web development experiences.';
export const MAIN_AUTHOR = 'Dominic Arrojado';
export const MAIN_URL = 'https://dominicarrojado.com';
export const PERSONAL_EMAIL = 'dominicarrojado@gmail.com';
export const PRIVACY_EMAIL = 'privacy@dominicarrojado.com';
export const DISCLAIMER_EMAIL = 'disclaimer@dominicarrojado.com';
export const ROUTES = Object.values(Route);
export const ROUTES_LENGTH = ROUTES.length;
export const SCROLL_DOWN_DURATION = 1500;
export const POSTS_PER_PAGE = 4;
export const META_IMAGE = `${MAIN_URL}/images/pages/guides-tips-and-tricks-to-web-development.png`;
export const META_IMAGE_WIDTH = 2400;
export const META_IMAGE_HEIGHT = 1254;
export const META_IMAGE_ALT =
  'Dominic Arrojado | Guides, Tips and Tricks to Web Development';
export const META_IMAGE_TYPE = 'image/png';

export const API_URL = 'https://api.dominicarrojado.com';

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

export const SCREEN_LG = 1024;

export const MAIN_ELEMENT_ID = 'main';

export const GOOGLE_ADSENSE_CLIENT_ID = 'ca-pub-3632473845121107';
export const GOOGLE_ADSENSE_UNITS = Object.values(GoogleAdSenseUnit);
export const GOOGLE_ADSENSE_UNITS_LENGTH = GOOGLE_ADSENSE_UNITS.length;
export const GOOGLE_ADSENSE_UNIT_FORMATS = Object.values(
  GoogleAdSenseUnitFormat
);
export const GOOGLE_ADSENSE_UNIT_FORMATS_LENGTH =
  GOOGLE_ADSENSE_UNIT_FORMATS.length;
export const GOOGLE_ADSENSE_UNIT_LAYOUTS = Object.values(
  GoogleAdSenseUnitLayout
);
export const GOOGLE_ADSENSE_UNIT_LAYOUTS_LENGTH =
  GOOGLE_ADSENSE_UNIT_LAYOUTS.length;

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
    imageWidth: 1004,
    imageHeight: 725,
    gifUrl: '/images/projects/thx-spatial-audio-web-app.gif',
  },
  {
    title: 'Razer Training Mode: Virus Edition',
    description:
      'Whack-a-mole mini-game where you whack viruses instead of moles.',
    links: [
      {
        title: 'Play Game',
        url: '/mouse-accuracy-game/',
      },
    ],
    imageUrl: '/images/projects/razer-training-mode-virus-edition-app.png',
    imageWidth: 1280,
    imageHeight: 720,
    gifUrl: '/images/projects/razer-training-mode-virus-edition-app.gif',
  },
  {
    title: 'Razer Chroma Studio Web',
    description:
      'A module of Razer Synapse recreated on the web that allows you to create various lighting effects and synchronize across multiple devices, while allowing you to follow the exact placement of your devices on your desktop.',
    links: [
      {
        title: 'Watch Demo',
        url: 'https://youtu.be/kFBe_wSwIMQ',
      },
    ],
    imageUrl: '/images/projects/razer-chroma-studio-web-app.png',
    imageWidth: 1920,
    imageHeight: 1039,
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
    imageWidth: 1440,
    imageHeight: 900,
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
    imageWidth: 600,
    imageHeight: 568,
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
    imageWidth: 1440,
    imageHeight: 900,
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
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/razer-id-web-app.gif',
  },
  {
    title: 'Qwerk',
    description:
      'Project management + chat tool for productivity. It has notes and a timer feature as well.',
    links: [
      {
        title: 'View Web App',
        url: 'https://www.justqwerk.com/sign-in',
      },
      {
        title: 'View Website',
        url: '/qwerk-website/',
      },
    ],
    imageUrl: '/images/projects/qwerk-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
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
        url: '/maybank-fc-barcelona-website/',
      },
    ],
    imageUrl: '/images/projects/maybank-fc-barcelona-website.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/maybank-fc-barcelona-website.gif',
  },
  {
    title: 'Food Republic: Capsule Surprise',
    description:
      "A classic game for Food Republic's Wisma Atria reopening. Food Republic is a food court chain run by the BreadTalk Group based in Singapore.",
    links: [
      {
        title: 'View Web App',
        url: 'https://food-republic-capsule-surprise.meteorapp.com/',
      },
    ],
    imageUrl: '/images/projects/food-republic-capsule-surprise-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/food-republic-capsule-surprise-web-app.gif',
  },
  {
    title: "Aptamil: Build Your Baby's Foundation to be One Step Ahead",
    description:
      'Campaign for Aptamil to promote the 2 key pillars of foundation: natural defences and brain development.',
    links: [
      {
        title: 'View Web App',
        url: '/aptamil-build-your-babys-foundation-to-be-one-step-ahead-app/',
      },
    ],
    imageUrl:
      '/images/projects/aptamil-build-your-babys-foundation-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/aptamil-build-your-babys-foundation-web-app.gif',
  },
  {
    title: 'Kronenbourg 1664',
    description:
      'Website for the most sold French beer in the world and the market leader for high-end premium beers.',
    links: [
      {
        title: 'View Website',
        url: '/kronenbourg-website/',
      },
    ],
    imageUrl: '/images/projects/kronenbourg-website.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/kronenbourg-website.gif',
  },
  {
    title: 'Singtel: Data x Infinity',
    description:
      "Web app for Singtel's event promoting new mobile data add-on. Singtel is one of the four major telcos operating in  Singapore",
    links: [
      {
        title: 'View Web App',
        url: '/singtel-data-x-infinity-event-app/',
      },
      {
        title: 'View Slideshow',
        url: '/singtel-data-x-infinity-event-slideshow/',
      },
    ],
    imageUrl: '/images/projects/singtel-data-x-infinity-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/singtel-data-x-infinity-web-app.gif',
  },
  {
    title: 'CNB: Anti Drug Abuse Campaign',
    description:
      'Campaign that aims to raise awareness and support for the anti-drug cause in Singapore.',
    links: [
      {
        title: 'View Web App',
        url: '/cnb-anti-drug-abuse-campaign-app/',
      },
      {
        title: 'View Slideshow',
        url: '/cnb-anti-drug-abuse-campaign-slideshow/',
      },
    ],
    imageUrl: '/images/projects/cnb-anti-drug-abuse-campaign-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/cnb-anti-drug-abuse-campaign-web-app.gif',
  },
  {
    title: 'Hashtag Interactive',
    description:
      'Website for a boutique digital marketing agency that is optimized for a digital-centric world.',
    links: [
      {
        title: 'View Website',
        url: '/hashtag-interactive-website/',
      },
    ],
    imageUrl: '/images/projects/hashtag-interactive-website.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/hashtag-interactive-website.gif',
  },
  {
    title: 'To My Valentine',
    description:
      "Valentine's day card app that lets you send cute e-cards to your special someone.",
    links: [
      {
        title: 'View Web App',
        url: '/hashtag-interactive-valentines-day-card-app/',
      },
    ],
    imageUrl:
      '/images/projects/hashtag-interactive-to-my-valentine-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/hashtag-interactive-to-my-valentine-web-app.gif',
  },
  {
    title: 'Holly Jolly Memory Game',
    description:
      'Simon-inspired memory game for Christmas by Hashtag Interactive.',
    links: [
      {
        title: 'Play Game',
        url: '/hashtag-interactive-christmas-game/',
      },
    ],
    imageUrl:
      '/images/projects/hashtag-interactive-holly-jolly-memory-game-web-app.png',
    imageWidth: 1440,
    imageHeight: 900,
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
        url: '/hashtag-interactive-welcome-edm/',
      },
    ],
    imageUrl: '/images/projects/hashtag-interactive-welcome-email-template.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/hashtag-interactive-welcome-email-template.gif',
  },
  {
    title: 'M1 Email Templates',
    description:
      'HTML email templates for M1, one of the four major telcos operating in  Singapore.',
    links: [
      {
        title: 'View Data Passport I',
        url: '/m1-data-passport-edm/',
      },
      {
        title: 'View Data Passport II',
        url: '/m1-data-passport-2-edm/',
      },
      {
        title: 'View Data Passport III',
        url: '/m1-data-passport-3-edm/',
      },
      {
        title: 'View Data Passport IV',
        url: '/m1-data-passport-4-edm/',
      },
    ],
    imageUrl: '/images/projects/m1-email-template.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/m1-email-template.gif',
  },
  {
    title: 'AXA Email Templates',
    description:
      "HTML email templates for AXA, one of the world's leading insurance companies.",
    links: [
      {
        title: 'View Smart Travel I',
        url: '/axa-smart-travel-edm/',
      },
      {
        title: 'View Smart Travel II',
        url: '/axa-smart-travel-2-edm/',
      },
      {
        title: "View Mother's Day",
        url: '/axa-mothers-day-edm/',
      },
      {
        title: 'View Shield',
        url: '/axa-shield-edm/',
      },
      {
        title: 'View SmartHome',
        url: '/axa-smart-home-edm/',
      },
      {
        title: 'View Singtel Partnership',
        url: '/axa-singtel-edm/',
      },
      {
        title: 'View September Promo',
        url: '/axa-september-promo-edm/',
      },
    ],
    imageUrl: '/images/projects/axa-email-template.png',
    imageWidth: 1440,
    imageHeight: 900,
    gifUrl: '/images/projects/axa-email-template.gif',
  },
];
export const BEST_PROJECTS = PROJECTS.filter(({ isBest }) => isBest);

export const SOCIAL_LINKS: Array<Social> = [
  {
    name: SocialName.DONATE,
    title: 'Show your support and donate!',
    url: ExternalUrl.PERSONAL_PAYPAL,
    icon: SvgDonate,
  },
  {
    name: SocialName.YOUTUBE,
    title: 'Watch my tech videos!',
    url: ExternalUrl.PERSONAL_YOUTUBE,
    icon: SvgYouTube,
  },
  {
    name: SocialName.LINKEDIN,
    title: "Let's connect on LinkedIn!",
    url: ExternalUrl.PERSONAL_LINKEDIN,
    icon: SvgLinkedIn,
  },
  {
    name: SocialName.GITHUB,
    title: 'Follow me on GitHub!',
    url: ExternalUrl.PERSONAL_GITHUB,
    icon: SvgGitHub,
  },
  {
    name: SocialName.EMAIL,
    title: 'Email me!',
    url: `mailto:${PERSONAL_EMAIL}`,
    icon: SvgEnvelope,
  },
];

export const TESTIMONIALS_SUCCESS_SWIPE_DIFF = 40;
export const TESTIMONIALS: Array<Testimonial> = [
  {
    name: 'Chirag Goel',
    jobTitle: 'Senior Engineering Manager',
    companyName: 'PropertyGuru Pte. Ltd.',
    quote:
      'Thanks for leading and supporting the team and also addressing critical issues. Thanks for your great work, very well-coordinated and delivered before time. Good work on finding efficient ways of doing recurring things. Together we made some good progress in the FinTech business and reached several milestones. I look forward to more amazing things!',
  },
  {
    name: 'Janice Lim',
    jobTitle: 'Senior Product Manager',
    companyName: 'PropertyGuru Pte. Ltd.',
    quote:
      "Having worked with many teams of engineers, very rarely do I encounter engineers like Dom who demonstrate the perfect blend of skills, creativity, and initiative. I'm extremely fortunate to have such an engineer on the team. It has not only made my job easier, but we've also ended up with better end products - seamless collaboration, great exchange of ideas, quick and precise execution.",
  },
  {
    name: 'Rangana Chandrasena',
    jobTitle: 'UI Design Lead',
    companyName: 'PropertyGuru Pte. Ltd.',
    quote:
      'Dom is fast and responsive for designer requests and super flexible for refinements. His attention to detail and work quality is solid. This helped a lot to build flawless products and features at a great speed. I work with him a lot and found it really easy to collaborate for pixel perfect designs.',
  },
  {
    name: 'Lucie Liew',
    jobTitle: 'Senior Product Designer',
    companyName: 'PropertyGuru Pte. Ltd.',
    quote:
      'Dom is knowledgeable, driven, sharp and humble. I admire the passion he has for his craft and willingness to share knowledge. Some examples are, giving good UX suggestions and sharing useful knowledge with the team. We worked together closely for the development of financial tools and the collaboration was seamless and smooth.',
  },
  {
    name: 'Lakshmi Bhandaram',
    jobTitle: 'Product Manager (Growth)',
    companyName: 'PropertyGuru Pte. Ltd.',
    quote:
      'In the few interactions I had with Dom, I can say that he has a lot of enthusiasm to learn new things, takes initiative and is very knowledgeable too. He not only voluntarily picked up a few growth tasks when he had time but also always contributed to making the team do better by providing his inputs wherever he sees scope for improvement.',
  },
  {
    name: 'Abhina Sathyan',
    jobTitle: 'Software Engineer',
    companyName: 'PropertyGuru Pte. Ltd.',
    quote:
      'Dominic has been a great colleague to work with. He is very much detail-oriented and is fast in execution of tasks. He helps a lot with code reviews and provides useful tips and suggestions. He is very proactive and always ready to help. I really appreciate his sharing sessions. He is also very knowledgeable and is always eager to learn more.',
  },
  {
    name: 'Hongzheng Liao (Jansen)',
    jobTitle: 'Director (Software)',
    companyName: 'Razer Inc.',
    quote:
      "It is every manager's dream to have an engineer like Dominic in the team. He is self-driven, confident, proactive and smart. He has brought great value to the team by consistently building and delivering software solutions in time and with great quality. He would always be an indispensable asset to any team he works for in the future and has my highest recommendation.",
  },
  {
    name: 'Gary Lim',
    jobTitle: 'Senior UX Designer',
    companyName: 'Razer Inc.',
    quote:
      "Not often do you find an engineer with an eye for design details, and Dominic happens to be one of them. I enjoyed working with him on some projects with complex UI (User Interface) design. Whenever he delivers, it's always a joy to see my design come alive as I intended. Any designer would be lucky to have Dominic working on his/her design.",
  },
  {
    name: 'Hao Long Chiang (Zack)',
    jobTitle: 'Senior Product Developer',
    companyName: 'Razer Inc.',
    quote:
      "He's a really good software engineer. His analytical skill is really very good, he can solve difficult business problems by recommending technical solutions while looking at the business case and discussing with the stakeholders.",
  },
  {
    name: 'Jixiang Li',
    jobTitle: 'Software Engineer',
    companyName: 'Razer Inc.',
    quote:
      'Dominic is a very good colleague to work with. He has excellent engineering and programming skills and I learned a lot from him when doing the same project together. He is also a kind and patient person. I am glad to have worked with him before.',
  },
  {
    name: 'Vincent Chin',
    jobTitle: 'Managing Partner',
    companyName: 'Hashtag Interactive Pte. Ltd.',
    quote:
      'Dominic has consistently shown a great aptitude for programming and continuously worked on advancing his knowledge in the field whilst performing his day-to-day functions; A self-learner, he was responsible and instrumental in many successful web and app development projects.',
  },
];
export const TESTIMONIALS_LENGTH = TESTIMONIALS.length;

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
export const MENU_ITEMS_LENGTH = MENU_ITEMS.length;

export const PAGINATION_MAX_LENGTH = 7; // must be odd

export const MODAL_TRANSITION_PROPS = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  enterTo: 'opacity-100 translate-y-0 sm:scale-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
  leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
};

export const DIALOG_NAMES = Object.values(DialogName);
export const DIALOG_NAMES_LENGTH = DIALOG_NAMES.length;
