import { fireEvent, render, screen, act } from '@testing-library/react';
import Window from '../../modules/Window';
import { getFakeWord } from '../../lib/test-helpers';
import { SOCIAL_LINKS } from '../../lib/constants';
import * as ga from '../../lib/google-analytics';
import SocialItems, { Props } from '../socialItems';

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

    it('should NOT display by default', () => {
      SOCIAL_LINKS.forEach((social) => {
        const anchorEl = screen.queryByLabelText(social.title);
        const listItemEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listItemEl).toHaveClass('lg:opacity-0');
      });
    });

    it('should display on window load', () => {
      act(() => {
        Window.emit('load');
      });

      SOCIAL_LINKS.forEach((social) => {
        const anchorEl = screen.queryByLabelText(social.title);
        const listItemEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listItemEl).not.toHaveClass('opacity-0');
      });
    });

    it('should track as hover if NOT clicked', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const socialTitle = social.title;
        const anchorEl = screen.queryByLabelText(
          socialTitle
        ) as HTMLAnchorElement;

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).toHaveBeenCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          event: 'social_hover',
          socialName: social.name,
          hoverText: socialTitle,
          hoverUrl: social.url,
        });

        trackEventSpy.mockClear();
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

    it('should NOT track as hover if clicked', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const socialTitle = social.title;
        const anchorEl = screen.queryByLabelText(
          socialTitle
        ) as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        trackEventSpy.mockClear();

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).not.toBeCalled();
      });
    });
  });
});
