import React, { ReactNode } from 'react';

export type Props = { children: ReactNode };

export default function ModalDescription({ children }: Props) {
  return <p className="mt-2">{children}</p>;
}
