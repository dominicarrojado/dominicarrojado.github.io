import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Window from '../../modules/Window';
import { fireEventTransitionEnd } from '../../lib/test-helpers';
import * as dom from '../../lib/dom';
import * as ga from '../../lib/google-analytics';
import { Social } from '../../lib/types';
import { QUOTES, SOCIAL_LINKS } from '../../lib/constants';
import Footer from '../footer';

jest.useFakeTimers();

describe('<Footer />', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  describe('content', () => {
    it('should have expected quotes', () => {
      QUOTES.forEach((item) => {
        const quoteEl = screen.queryByText(`“${item.quote}”`);
        const authorText = `— ${item.author}`;

        expect(quoteEl?.tagName).toBe('BLOCKQUOTE');
        expect(screen.queryByText(authorText)).toBeInTheDocument();
      });
    });

    it('should have expected social items', () => {
      SOCIAL_LINKS.forEach((social) => {
        const tooltipEl = screen.queryByText(social.title);
        const anchorEl = tooltipEl?.closest('a');

        expect(anchorEl).toHaveAttribute('href', social.url);
        expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
        expect(anchorEl).toHaveAttribute('target', '_blank');
      });
    });

    it('should have expected credits', () => {
      const currentYear = new Date().getFullYear();
      const credits = `© Dominic Arrojado ${currentYear}`;

      expect(screen.queryByText(credits)).toBeInTheDocument();
    });
  });

  describe('<Quotes />', () => {
    it('should display first quote on mount', () => {
      QUOTES.forEach((item, idx) => {
        const quoteEl = screen.queryByText(`“${item.quote}”`);
        const containerEl = quoteEl?.closest('li');

        if (idx !== 0) {
          expect(containerEl).toHaveClass('opacity-0');
        } else {
          expect(containerEl).not.toHaveClass('opacity-0');
        }
      });
    });

    it('should display next quote on interval', () => {
      act(() => {
        jest.runOnlyPendingTimers();
      });

      QUOTES.forEach((item, idx) => {
        const quoteEl = screen.queryByText(`“${item.quote}”`);
        const containerEl = quoteEl?.closest('li');

        if (idx !== 1) {
          expect(containerEl).toHaveClass('opacity-0');
        } else {
          expect(containerEl).not.toHaveClass('opacity-0');
        }
      });
    });

    it('should display first quote after last quote', () => {
      act(() => {
        QUOTES.forEach(() => {
          jest.runOnlyPendingTimers();
        });
      });

      QUOTES.forEach((item, idx) => {
        const quoteEl = screen.queryByText(`“${item.quote}”`);
        const containerEl = quoteEl?.closest('li');

        if (idx !== 0) {
          expect(containerEl).toHaveClass('opacity-0');
        } else {
          expect(containerEl).not.toHaveClass('opacity-0');
        }
      });
    });
  });

  describe('<Social />', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should be hidden when window is NOT loaded', () => {
      SOCIAL_LINKS.forEach((social) => {
        const tooltipEl = screen.queryByText(social.title);
        const listItemEl = tooltipEl?.closest('li') as HTMLLIElement;

        expect(listItemEl).toHaveClass('lg:opacity-0');
      });
    });

    it('should display when window is loaded', () => {
      act(() => {
        Window.emit('load');
      });

      SOCIAL_LINKS.forEach((social) => {
        const tooltipEl = screen.queryByText(social.title);
        const listItemEl = tooltipEl?.closest('li') as HTMLLIElement;

        expect(listItemEl).not.toHaveClass('opacity-0');
      });
    });

    it('should handle normal links', () => {
      SOCIAL_LINKS.forEach((social) => {
        if (social.shouldCopyOnClick) {
          return;
        }

        const copyTextToClipboardMock = jest.spyOn(dom, 'copyTextToClipboard');

        const { title } = social;
        const copySuccessText = 'Copied!';
        const tooltipEl = screen.queryByText(title);
        const anchorEl = tooltipEl?.closest('a') as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(copyTextToClipboardMock).not.toBeCalled();
        expect(screen.queryByText(title)).toBeInTheDocument();
        expect(screen.queryByText(copySuccessText)).not.toBeInTheDocument();

        copyTextToClipboardMock.mockClear();
      });
    });

    it('should handle copy text if available', () => {
      const socialNoCopy = SOCIAL_LINKS.find(
        (social) => !social.shouldCopyOnClick
      ) as Social;
      const otherTooltipEl = screen.queryByText(socialNoCopy?.title);
      const otherAnchorEl = otherTooltipEl?.closest('a') as HTMLAnchorElement;

      SOCIAL_LINKS.forEach((social) => {
        if (!social.shouldCopyOnClick) {
          return;
        }

        const copyTextToClipboardMock = jest
          .spyOn(dom, 'copyTextToClipboard')
          .mockReturnValue(true);

        const { title } = social;
        const textToCopy = social.url.replace('mailto:', '');
        const copySuccessText = 'Copied!';
        const tooltipEl = screen.queryByText(title) as HTMLDivElement;
        const anchorEl = tooltipEl?.closest('a') as HTMLAnchorElement;

        // expect text to be copied on click
        fireEvent.click(anchorEl);

        expect(copyTextToClipboardMock).toBeCalledTimes(1);
        expect(copyTextToClipboardMock).toBeCalledWith(textToCopy);
        expect(screen.queryByText(title)).not.toBeInTheDocument();
        expect(screen.queryByText(copySuccessText)).toBeInTheDocument();

        // expect "Copied!" to remain displayed on mouse enter of other element
        fireEvent.mouseEnter(otherAnchorEl);

        expect(screen.queryByText(title)).not.toBeInTheDocument();
        expect(screen.queryByText(copySuccessText)).toBeInTheDocument();

        // expect "Copied!" to be hidden on mouse enter of same element
        fireEventTransitionEnd(tooltipEl, 'opacity');

        expect(screen.queryByText(title)).toBeInTheDocument();
        expect(screen.queryByText(copySuccessText)).not.toBeInTheDocument();

        copyTextToClipboardMock.mockClear();
      });
    });

    it('should handle copy text if unavailable', () => {
      SOCIAL_LINKS.forEach((social) => {
        if (!social.shouldCopyOnClick) {
          return;
        }

        const copyTextToClipboardMock = jest
          .spyOn(dom, 'copyTextToClipboard')
          .mockReturnValue(false);

        const { title } = social;
        const textToCopy = social.url.replace('mailto:', '');
        const copySuccessText = 'Copied!';
        const tooltipEl = screen.queryByText(title);
        const anchorEl = tooltipEl?.closest('a') as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(copyTextToClipboardMock).toBeCalledTimes(1);
        expect(copyTextToClipboardMock).toBeCalledWith(textToCopy);
        expect(screen.queryByText(title)).toBeInTheDocument();
        expect(screen.queryByText(copySuccessText)).not.toBeInTheDocument();

        copyTextToClipboardMock.mockClear();
      });
    });

    it('should track as hover if NOT clicked', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const socialTitle = social.title;
        const tooltipEl = screen.queryByText(socialTitle);
        const anchorEl = tooltipEl?.closest('a') as HTMLAnchorElement;

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

        jest.spyOn(dom, 'copyTextToClipboard').mockImplementation();

        const socialTitle = social.title;
        const tooltipEl = screen.queryByText(socialTitle);
        const anchorEl = tooltipEl?.closest('a') as HTMLAnchorElement;

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

        jest.spyOn(dom, 'copyTextToClipboard').mockImplementation();

        const socialTitle = social.title;
        const tooltipEl = screen.queryByText(socialTitle);
        const anchorEl = tooltipEl?.closest('a') as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        trackEventSpy.mockClear();

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).not.toBeCalled();
      });
    });
  });
});
