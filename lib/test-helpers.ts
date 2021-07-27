import { fireEvent } from '@testing-library/react';
import faker from 'faker';

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

export function getFakeNumber() {
  return faker.datatype.number();
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
