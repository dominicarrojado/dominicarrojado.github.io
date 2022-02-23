import React, { ForwardedRef, forwardRef, HTMLProps } from 'react';

export type Props = HTMLProps<HTMLAnchorElement> & { isExternal?: boolean };

const AnchorLink = forwardRef(
  (
    { target, rel, children, isExternal, ...props }: Props,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <a
        ref={ref}
        target={!isExternal ? target : '_blank'}
        rel={!isExternal ? rel : 'noopener noreferrer nofollow'}
        {...props}
      >
        {children}
      </a>
    );
  }
);

AnchorLink.displayName = 'AnchorLink';

export default AnchorLink;
