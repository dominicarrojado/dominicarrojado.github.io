import React from 'react';
import { Transition as ReactTransition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

export type Props<RefElement extends undefined | HTMLElement = undefined> =
  TransitionProps<RefElement>;

export default function Transition<
  RefElement extends undefined | HTMLElement = undefined
>(props: Props<RefElement>) {
  return <ReactTransition {...props} />;
}
