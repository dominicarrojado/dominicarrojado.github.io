import Link, { LinkProps } from 'next/link';
import React, { ReactElement, useState } from 'react';
import { Route } from '../lib/types';

export type Props = LinkProps & { href: string; children: ReactElement };

export default function NextLink({ children, href, ...props }: Props) {
  const child = React.Children.only(children);
  const [shouldReload, setShouldReload] = useState(false);

  const onMouseEnter = () => {
    if (
      !shouldReload &&
      href.startsWith(Route.POSTS) &&
      (window.adsbygoogle as any)?.loaded
    ) {
      setShouldReload(true);
    }

    if (typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter();
    }
  };

  if (shouldReload) {
    return React.cloneElement(child, { href });
  }

  return (
    <Link {...props} href={href}>
      {React.cloneElement(child, { onMouseEnter })}
    </Link>
  );
}
