import React from 'react';

export function getTouchEventData(
  e:
    | TouchEvent
    | MouseEvent
    | React.TouchEvent<HTMLElement>
    | React.MouseEvent<HTMLElement>
) {
  return 'changedTouches' in e ? e.changedTouches[0] : e;
}

export function getScrollWidth() {
  const bodyEl = document.body;
  const offsetWidth = window.innerWidth - bodyEl.offsetWidth;

  return offsetWidth;
}
