import Link, { LinkProps } from 'next/link';
import React, { ReactElement, useMemo } from 'react';
import { useWindowLoaded } from '../lib/custom-hooks';
import { Route } from '../lib/types';

export type Props = LinkProps & { href: string; children: ReactElement };

export default function NextLink({ children, href, ...props }: Props) {
  const isWindowLoaded = useWindowLoaded();
  const shouldReload = useMemo(() => {
    return (
      isWindowLoaded &&
      href.startsWith(Route.POSTS) &&
      (window.adsbygoogle as any)?.loaded
    );
  }, [isWindowLoaded, href]);

  if (shouldReload) {
    return React.cloneElement(React.Children.only(children), { href });
  }

  return (
    <Link {...props} href={href}>
      {children}
    </Link>
  );
}
