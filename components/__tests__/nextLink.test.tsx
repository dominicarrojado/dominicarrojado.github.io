import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  getFakeBoolean,
  getFakeSentence,
  getFakeWord,
  getRandomRoute,
} from '@/lib/test-helpers';
import { Route } from '@/lib/types';
import * as Link from 'next/link';
import NextLink, { Props } from '../nextLink';

jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ children, passHref, legacyBehavior, ...props }) =>
    React.cloneElement(children, props)
  ),
}));

describe('<NextLink />', () => {
  const renderComponent = ({ children, ...props }: Props) =>
    render(<NextLink {...props}>{children}</NextLink>);
  const getRoutePosts = () => {
    return getFakeBoolean() ? Route.POSTS : Route.POSTS_PAGE;
  };
  const getRandomRouteExceptPosts = (): Exclude<
    Route,
    Route.POSTS | Route.POSTS_PAGE
  > => {
    const route = getRandomRoute();

    if (route === Route.POSTS || route === Route.POSTS_PAGE) {
      return getRandomRouteExceptPosts();
    }

    return route;
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should NOT reload page if route does NOT start with /posts', async () => {
    const linkSpy = jest.spyOn(Link, 'default');

    const href = getRandomRouteExceptPosts();
    const className = getFakeWord();
    const text = getFakeSentence();
    const children = <a className={className}>{text}</a>;

    renderComponent({ href, children });

    const anchorEl = screen.queryByText(text) as HTMLAnchorElement;

    expect(anchorEl).toHaveAttribute('href', href);
    expect(anchorEl).toHaveClass(className);

    expect(linkSpy).toBeCalledTimes(1);
    expect(linkSpy).toBeCalledWith(expect.objectContaining({ href }), {});
  });

  it('should reload page if route starts with /posts', () => {
    const linkSpy = jest.spyOn(Link, 'default');

    const href = getRoutePosts();
    const className = getFakeWord();
    const text = getFakeSentence();
    const children = <a className={className}>{text}</a>;

    renderComponent({ href, children });

    linkSpy.mockClear();

    const anchorEl = screen.queryByText(text) as HTMLAnchorElement;

    expect(anchorEl).toHaveAttribute('href', href);
    expect(anchorEl).toHaveClass(className);

    expect(linkSpy).not.toBeCalled();
  });
});
