import Link, { LinkProps } from 'next/link';
import React, { ReactElement } from 'react';
import { Route } from '../lib/types';

export type Props = LinkProps & { href: string; children: ReactElement };

export default function NextLink({
  children,
  href,
  passHref,
  ...props
}: Props) {
  const child = React.Children.only(children);

  if (href.startsWith(Route.POSTS)) {
    return React.cloneElement(child, { ...props, href: `${href}/` });
  }

  return (
    <Link href={href} passHref={passHref} legacyBehavior>
      {React.cloneElement(child, props)}
    </Link>
  );
}
