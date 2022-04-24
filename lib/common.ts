import { PAGINATION_MAX_LENGTH } from './constants';

export function getPagination(currentPage: number, lastPage: number) {
  const minPage = 1;
  const pages = [currentPage];
  const sidesLength = Math.floor(PAGINATION_MAX_LENGTH / 2);
  let leftSideStart = currentPage - sidesLength;
  leftSideStart = Math.max(minPage, leftSideStart);

  let remainingLength = PAGINATION_MAX_LENGTH - 1;

  for (let i = currentPage - 1; i >= leftSideStart; i--) {
    pages.unshift(i);
    remainingLength -= 1;
  }

  let rightSideEnd = currentPage + remainingLength;
  rightSideEnd = Math.min(rightSideEnd, lastPage);

  for (let j = currentPage + 1; j <= rightSideEnd; j++) {
    pages.push(j);
  }

  const isEqualOrGreaterThanMax = lastPage >= PAGINATION_MAX_LENGTH;

  if (isEqualOrGreaterThanMax) {
    leftSideStart -= 1;

    while (pages.length < PAGINATION_MAX_LENGTH) {
      pages.unshift(leftSideStart);
      leftSideStart -= 1;
    }
  }

  // ellipsis (...) logic
  if (isEqualOrGreaterThanMax) {
    const firstIndex = 0;
    const secondIndex = firstIndex + 1;
    const lastIndex = PAGINATION_MAX_LENGTH - 1;
    const secondLastIndex = lastIndex - 1;

    pages[firstIndex] = 1;
    pages[lastIndex] = lastPage;

    if (pages[secondIndex] - 1 !== 1) {
      pages[secondIndex] = NaN;
    }

    if (lastPage - pages[secondLastIndex] !== 1) {
      pages[secondLastIndex] = NaN;
    }
  }

  return pages;
}
