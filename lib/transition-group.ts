import { TransitionStatus } from 'react-transition-group';

export function checkShouldAnimate(state: TransitionStatus) {
  return state === 'entering' || state === 'entered';
}
