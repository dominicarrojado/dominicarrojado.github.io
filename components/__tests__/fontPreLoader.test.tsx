import { render } from '@testing-library/react';
import { FONTS } from '../../lib/constants';
import * as Head from 'next/head';
import FontPreLoader from '../fontPreLoader';

describe('<FontPreLoader />', () => {
  const renderComponent = () => render(<FontPreLoader />);

  beforeEach(() => {
    jest
      .spyOn(Head, 'default')
      .mockImplementation(({ children }) => <>{children}</>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render preload font tags', () => {
    renderComponent();

    const origin = location.origin;
    const linkEls = document.querySelectorAll('link');
    const fontHrefMap = FONTS.reduce((map: Record<string, any>, font) => {
      map[`${origin}/fonts/${font}.woff2`] = true;
      map[`${origin}/fonts/${font}.woff`] = true;

      return map;
    }, {});

    linkEls.forEach((linkEl) => {
      const { href } = linkEl;

      expect(linkEl).toHaveAttribute('rel', 'preload');
      expect(linkEl).toHaveAttribute('as', 'font');

      if (href.endsWith('woff2')) {
        expect(linkEl).toHaveAttribute('type', 'font/woff2');
      } else {
        expect(linkEl).toHaveAttribute('type', 'font/woff');
      }

      expect(linkEl).toHaveAttribute('crossOrigin', 'anonymous');

      delete fontHrefMap[href];
    });

    expect(Object.keys(fontHrefMap)).toHaveLength(0);
  });
});
