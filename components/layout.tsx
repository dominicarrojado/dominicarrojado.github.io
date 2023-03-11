import { ReactNode, useEffect, useRef } from 'react';
import { getRefValue } from '../lib/hooks';
import Header from './header';
import Footer from './footer';
import FooterFloating from './footerFloating';
import { Route } from '../lib/types';
import { MAIN_ELEMENT_ID } from '../lib/constants';

export type Props = { route: Route; children: ReactNode };

export default function Layout({ route, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // clear styles applied to next root element and layout container by libraries
    // (e.g. height: auto!important) which causes issue with full-height sections
    const nextRoot = document.querySelector('body > div:first-child');
    const containerEl = getRefValue(containerRef);

    containerEl.removeAttribute('style');
    nextRoot?.removeAttribute('style');
  }, [route]);

  return (
    <div ref={containerRef} tabIndex={-1} className="h-full outline-none">
      <Header route={route} />

      <div id={MAIN_ELEMENT_ID} />
      {children}

      <Footer />
      <FooterFloating />
    </div>
  );
}
