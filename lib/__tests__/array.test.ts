import { sortArrayByKeys } from '../array';
import { getFakeNumber, getFakeSentence, getFakeWord } from '../test-helpers';

describe('array utilities', () => {
  it('should sort alphabet values ascendingly', () => {
    const key = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key]: getFakeSentence() });
    }

    const sortedArray = sortArrayByKeys(testArray, { [key]: 1 });

    let maxValue = '';

    sortedArray.forEach((obj) => {
      const value = obj[key].toUpperCase();

      expect(value >= maxValue).toBe(true);

      maxValue = value;
    });
  });

  it('should sort alphabet values descendingly', () => {
    const key = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key]: getFakeSentence() });
    }

    const sortedArray = sortArrayByKeys(testArray, { [key]: -1 });

    let minValue = 'Z';

    sortedArray.forEach((obj) => {
      const value = obj[key].toUpperCase();

      expect(value <= minValue).toBe(true);

      minValue = value;
    });
  });

  it('should sort number values ascendingly', () => {
    const key = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key]: getFakeNumber() });
    }

    const sortedArray = sortArrayByKeys(testArray, { [key]: 1 });

    let maxValue = -Infinity;

    sortedArray.forEach((obj) => {
      const value = obj[key];

      expect(value >= maxValue).toBe(true);

      maxValue = value;
    });
  });

  it('should sort number values descendingly', () => {
    const key = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key]: getFakeNumber() });
    }

    const sortedArray = sortArrayByKeys(testArray, { [key]: -1 });

    let minValue = Infinity;

    sortedArray.forEach((obj) => {
      const value = obj[key];

      expect(value <= minValue).toBe(true);

      minValue = value;
    });
  });

  it('should sort second value ascendingly if first values are equal', () => {
    const key1 = getFakeWord();
    const key2 = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key1]: 1, [key2]: getFakeNumber() });
    }

    const sortedArray = sortArrayByKeys(testArray, { [key1]: 1, [key2]: 1 });

    let maxValue = -Infinity;

    sortedArray.forEach((obj) => {
      const value = obj[key2];

      expect(value >= maxValue).toBe(true);

      maxValue = value;
    });
  });

  it('should sort second value descendingly if first values are equal', () => {
    const key1 = getFakeWord();
    const key2 = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key1]: 1, [key2]: getFakeNumber() });
    }

    const sortedArray = sortArrayByKeys(testArray, { [key1]: -1, [key2]: -1 });

    let minValue = Infinity;

    sortedArray.forEach((obj) => {
      const value = obj[key2];

      expect(value <= minValue).toBe(true);

      minValue = value;
    });
  });

  it('should return same array if no sort object is given', () => {
    const key = getFakeWord();
    const testArray = [];

    for (let i = 0; i < 10; i++) {
      testArray.push({ [key]: getFakeSentence() });
    }

    const sortedArray = sortArrayByKeys(testArray, {});

    expect(sortedArray).toEqual(testArray);
  });
});
