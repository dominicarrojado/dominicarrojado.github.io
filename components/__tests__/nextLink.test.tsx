import { act, fireEvent, render, screen } from '@testing-library/react';
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

  it('should NOT reload next route if ads are hidden on hover', () => {
    const linkSpy = jest.spyOn(Link, 'default');

    const href = getRandomRoute();
    const className = getFakeWord();
    const text = getFakeSentence();
    const children = <a className={className}>{text}</a>;

    renderComponent({ href, children });

    const anchorEl = screen.queryByText(text) as HTMLAnchorElement;

    act(() => {
      fireEvent.mouseEnter(anchorEl);
    });

    expect(anchorEl).toHaveAttribute('href', href);
    expect(anchorEl).toHaveClass(className);

    expect(linkSpy).toBeCalledTimes(1);
    expect(linkSpy).toBeCalledWith(expect.objectContaining({ href }), {});
  });

  it('should reload next route if ads are displayed on hover', () => {
    const linkSpy = jest.spyOn(Link, 'default');

    window.adsbygoogle = { loaded: true } as any;

    const href = Route.POSTS;
    const className = getFakeWord();
    const text = getFakeSentence();
    const children = <a className={className}>{text}</a>;

    renderComponent({ href, children });

    linkSpy.mockClear();

    const anchorEl = screen.queryByText(text) as HTMLAnchorElement;

    act(() => {
      fireEvent.mouseEnter(anchorEl);
    });

    expect(anchorEl).toHaveAttribute('href', href);
    expect(anchorEl).toHaveClass(className);

    expect(linkSpy).not.toBeCalled();
  });

  it('should call onMouseEnter from child prop on hover', () => {
    window.adsbygoogle = { loaded: true } as any;

    const href = Route.POSTS;
    const className = getFakeWord();
    const text = getFakeSentence();
    const onMouseEnterMock = jest.fn();
    const children = (
      <a className={className} onMouseEnter={onMouseEnterMock}>
        {text}
      </a>
    );

    renderComponent({ href, children });

    const anchorEl = screen.queryByText(text) as HTMLAnchorElement;

    act(() => {
      fireEvent.mouseEnter(anchorEl);
    });

    expect(onMouseEnterMock).toBeCalledTimes(1);
  });
});
