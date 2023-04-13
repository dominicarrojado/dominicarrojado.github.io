import { fireEvent, render, screen } from '@testing-library/react';
import {
  getFakeBoolean,
  getFakeNumber,
  getRandomSocialLink,
} from '@/lib/test-helpers';
import * as ga from '@/lib/google-analytics';
import HeaderSocialItem, { Props } from '../headerSocialItem';

jest.mock('@/lib/google-analytics', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/google-analytics'),
}));

describe('<HeaderSocialItem />', () => {
  const renderComponent = (props: Props) =>
    render(<HeaderSocialItem {...props} />);

  it('should have expected attributes', () => {
    const social = getRandomSocialLink();

    renderComponent({
      social,
      idx: getFakeNumber({ min: 0 }),
      shouldDisplay: getFakeBoolean(),
    });

    const subtitleEl = screen.queryByText(social.subtitle);
    const anchorEl = subtitleEl?.closest('a');

    expect(anchorEl).toHaveAttribute('title', social.title);
    expect(anchorEl).toHaveAttribute('aria-label', social.title);
    expect(anchorEl).toHaveAttribute('href', social.url);
    expect(anchorEl).toHaveAttribute('target', '_blank');
    expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
  });

  it('should be hidden if shouldDisplay prop is false', () => {
    const social = getRandomSocialLink();

    renderComponent({
      social,
      idx: getFakeNumber({ min: 0 }),
      shouldDisplay: false,
    });

    const anchorEl = screen.queryByTitle(social.title);
    const listItemEl = anchorEl?.closest('li');

    expect(listItemEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if shouldDisplay prop is true', () => {
    const social = getRandomSocialLink();

    renderComponent({
      social,
      idx: getFakeNumber({ min: 0 }),
      shouldDisplay: true,
    });

    const anchorEl = screen.queryByTitle(social.title);
    const listItemEl = anchorEl?.closest('li');

    expect(listItemEl).not.toHaveClass('opacity-0');
  });

  it('should track click', () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    const social = getRandomSocialLink();

    renderComponent({
      social,
      idx: getFakeNumber({ min: 0 }),
      shouldDisplay: false,
    });

    const anchorText = social.title;
    const anchorEl = screen.queryByTitle(anchorText) as HTMLAnchorElement;

    fireEvent.click(anchorEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'social_click',
      linkText: anchorText,
      linkUrl: social.url,
      socialName: social.name,
    });
  });
});
