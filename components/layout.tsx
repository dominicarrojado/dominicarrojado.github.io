import { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { Route } from '../lib/types';
import { MAIN_ELEMENT_ID } from '../lib/constants';

function Layout({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <div tabIndex={-1} className="h-full outline-none">
      <Header route={route} />

      <div id={MAIN_ELEMENT_ID} />
      {children}

      <Footer />
    </div>
  );
}

export default Layout;
