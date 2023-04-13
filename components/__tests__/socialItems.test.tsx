import { fireEvent, render, screen } from '@testing-library/react';
import { getFakeWord } from '@/lib/test-helpers';
import { SOCIAL_LINKS } from '@/lib/constants';
import * as ga from '@/lib/google-analytics';
import SocialItems, { Props } from '../socialItems';

jest.mock('@/lib/google-analytics', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/google-analytics'),
}));

describe('<SocialItems />', () => {
  const renderComponent = (props: Props) => render(<SocialItems {...props} />);

  it('should accept className prop', () => {
    const className = getFakeWord();

    const { container } = renderComponent({ className });

    expect(container.firstElementChild).toHaveClass(className);
  });

  describe('links', () => {
    beforeEach(() => {
      renderComponent({});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should display on mount', () => {
      SOCIAL_LINKS.forEach((social) => {
        const anchorEl = screen.queryByLabelText(social.title);
        const listItemEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listItemEl).not.toHaveClass('opacity-0');
      });
    });

    it('should track click', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const socialTitle = social.title;
        const anchorEl = screen.queryByLabelText(
          socialTitle
        ) as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(trackEventSpy).toHaveBeenCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          event: 'social_click',
          socialName: social.name,
          linkText: socialTitle,
          linkUrl: social.url,
        });

        trackEventSpy.mockClear();
      });
    });
  });
});
