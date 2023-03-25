import { Transition } from '@headlessui/react';
import React, { ReactNode } from 'react';

type Props = {
  show: boolean;
  enter?: string;
  enterFrom: string;
  enterTo: string;
  leave?: string;
  leaveFrom: string;
  leaveTo: string;
  className?: string;
  children: ReactNode;
};

export default function HeadlessTransition({ children, ...props }: Props) {
  return <Transition {...props}>{children}</Transition>;
}
