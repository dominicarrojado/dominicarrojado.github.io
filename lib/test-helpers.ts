import { fireEvent, Screen } from '@testing-library/react';
import faker from 'faker';
import fs from 'fs';
import path from 'path';
import { Nullish } from './types';
import {
  GOOGLE_ADSENSE_UNITS,
  GOOGLE_ADSENSE_UNITS_LENGTH,
  GOOGLE_ADSENSE_UNIT_FORMATS,
  GOOGLE_ADSENSE_UNIT_FORMATS_LENGTH,
  GOOGLE_ADSENSE_UNIT_LAYOUTS,
  GOOGLE_ADSENSE_UNIT_LAYOUTS_LENGTH,
  ROUTES,
  ROUTES_LENGTH,
} from './constants';

type GetFakeNumber = {
  (max?: number): number;
  (options?: { min?: number; max?: number; precision?: number }): number;
};

export function setReadOnlyProperty<
  O extends Record<string, any>,
  K extends keyof O,
  V extends any
>(object: O, property: K, value: V) {
  Object.defineProperty(object, property, {
    value,
    configurable: true,
  });
}

export function queryByTextIgnoreHTML(screen: Screen, text: string) {
  return screen.getByText((_: string, node: Nullish<Element>) => {
    const hasText = (node: Nullish<Element>) => node?.textContent === text;
    const nodeHasText = hasText(node);
    let childrenDontHaveText = true;

    if (node) {
      childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );
    }

    return nodeHasText && childrenDontHaveText;
  });
}

export function fireEventTransitionEnd(
  element: HTMLElement,
  propertyName?: string
) {
  const transitionEndEvent = new Event('transitionend', {
    bubbles: true,
    cancelable: false,
  });
  (transitionEndEvent as any).propertyName = propertyName;

  fireEvent(element, transitionEndEvent);
}

export function getMonthName(monthIdx: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthIdx];
}

export function getRandomRoute() {
  return ROUTES[getFakeNumber(ROUTES_LENGTH - 1)];
}

export function getRandomPostId() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    // remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    return id;
  });

  return posts[getFakeNumber(posts.length - 1)];
}

export function getRandomGoogleAdSenseUnit() {
  return GOOGLE_ADSENSE_UNITS[getFakeNumber(GOOGLE_ADSENSE_UNITS_LENGTH - 1)];
}

export function getRandomGoogleAdSenseUnitFormat() {
  return GOOGLE_ADSENSE_UNIT_FORMATS[
    getFakeNumber(GOOGLE_ADSENSE_UNIT_FORMATS_LENGTH - 1)
  ];
}

export function getRandomGoogleAdsenseUnitLayout() {
  return GOOGLE_ADSENSE_UNIT_LAYOUTS[
    getFakeNumber(GOOGLE_ADSENSE_UNIT_LAYOUTS_LENGTH - 1)
  ];
}

export function getMatchMediaMock(
  customResponse = {} as Partial<MediaQueryList>
) {
  return jest.fn(
    (media: string) =>
      ({
        media,
        matches: getFakeBoolean(),
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        onchange: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        ...customResponse,
      } as MediaQueryList)
  );
}

export function getFakeBoolean() {
  return faker.datatype.boolean();
}

export function getFakeString() {
  return faker.datatype.string();
}

export function getFakeWord() {
  return faker.lorem.word();
}

export function getFakeSentence() {
  return faker.lorem.sentence();
}

export function getFakeSentences() {
  return faker.lorem.sentences();
}

export function getFakeColor() {
  return faker.internet.color();
}

export function getFakeNumber<T = GetFakeNumber>(data?: T) {
  return faker.datatype.number(data);
}

export function getFakeDirectoryPath() {
  return faker.system.directoryPath();
}

export function getFakeImageUrl() {
  return faker.image.imageUrl();
}

export function getFakeDomainWord() {
  return faker.internet.domainWord();
}

export function getFakeUrl() {
  return faker.internet.url();
}

export function getFakeUuid() {
  return faker.datatype.uuid();
}

export function getFakeDate() {
  const datePast = faker.date.past();
  const year = datePast.getFullYear();
  let month: string | number = datePast.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day: string | number = datePast.getDate();
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

export function getFakeName() {
  return faker.name.findName();
}

export function getFakeJobTitle() {
  return faker.name.jobTitle();
}

export function getFakeCompanyName() {
  return faker.company.companyName();
}

export function getFakeJson() {
  return JSON.parse(faker.datatype.json()) as Record<string, any>;
}
