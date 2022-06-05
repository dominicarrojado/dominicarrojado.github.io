import { act, render, screen } from '@testing-library/react';
import Window from '../../modules/Window';
import {
  getFakeSentence,
  getFakeWord,
  getRandomRoute,
} from '../../lib/test-helpers';
import { Route } from '../../lib/types';
import * as Link from 'next/link';
import NextLink, { Props } from '../nextLink';

describe('<NextLink />', () => {
  const renderComponent = ({ children, ...props }: Props) =>
    render(<NextLink {...props}>{children}</NextLink>);
  const adsByGoogleOrig = window.adsbygoogle;

  afterEach(() => {
    jest.restoreAllMocks();

    window.adsbygoogle = adsByGoogleOrig;
  });

  it('should NOT reload page', () => {
    const linkSpy = jest.spyOn(Link, 'default');

    const href = getRandomRoute();
    const className = getFakeWord();
    const text = getFakeSentence();
    const children = <a className={className}>{text}</a>;

    renderComponent({ href, children });

    const anchorEl = screen.queryByText(text);

    expect(anchorEl).toHaveAttribute('href', href);
    expect(anchorEl).toHaveClass(className);

    expect(linkSpy).toBeCalledTimes(1);
    expect(linkSpy).toBeCalledWith({ href, children }, {});
  });

  it('should reload page', () => {
    const linkSpy = jest.spyOn(Link, 'default');

    window.adsbygoogle = { loaded: true } as any;

    const href = Route.POSTS;
    const className = getFakeWord();
    const text = getFakeSentence();
    const children = <a className={className}>{text}</a>;

    renderComponent({ href, children });

    linkSpy.mockClear();

    act(() => {
      Window.emit('load');
    });

    const anchorEl = screen.queryByText(text);

    expect(anchorEl).toHaveAttribute('href', href);
    expect(anchorEl).toHaveClass(className);

    expect(linkSpy).not.toBeCalled();
  });
});
