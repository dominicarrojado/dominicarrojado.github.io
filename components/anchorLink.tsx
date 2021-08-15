import React, { HTMLProps } from 'react';

function AnchorLink({
  target,
  rel,
  children,
  isExternal,
  ...props
}: HTMLProps<HTMLAnchorElement> & { isExternal?: boolean }) {
  return (
    <a
      target={!isExternal ? target : '_blank'}
      rel={!isExternal ? rel : 'noopener noreferrer nofollow'}
      {...props}
    >
      {children}
    </a>
  );
}

export default AnchorLink;
