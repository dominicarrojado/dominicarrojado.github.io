import { render, screen, act } from '@testing-library/react';
import Window from '../../modules/Window';
import { queryByTextIgnoreHTML } from '../../lib/test-helpers';
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
        const anchorEl = screen.queryByLabelText(social.title);

        expect(anchorEl).toHaveAttribute('href', social.url);
        expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
        expect(anchorEl).toHaveAttribute('target', '_blank');
      });
    });

    it('should have expected legal items', () => {
      const currentYear = new Date().getFullYear();
      const legalText = `©${currentYear} Dominic Arrojado · Privacy Policy · Disclaimer`;
      const privacyAnchorEl = screen.queryByText('Privacy Policy');
      const disclaimerAnchorEl = screen.queryByText('Disclaimer');
      const linkEls = [privacyAnchorEl, disclaimerAnchorEl];

      expect(queryByTextIgnoreHTML(screen, legalText)).toBeInTheDocument();

      linkEls.forEach((linkEl) => {
        expect(linkEl?.tagName).toBe('A');
        expect(linkEl).not.toHaveAttribute('target');
        expect(linkEl).not.toHaveAttribute('rel');
      });

      expect(privacyAnchorEl).toHaveAttribute('href', '/privacy-policy');

      expect(disclaimerAnchorEl).toHaveAttribute('href', '/disclaimer');
    });

    it('should NOT display by default', () => {
      const footerEl = screen.queryByTestId('footer');

      expect(footerEl).toHaveClass('opacity-0');
    });

    it('should display on window load', () => {
      act(() => {
        Window.emit('load');
      });

      const footerEl = screen.queryByTestId('footer');

      expect(footerEl).not.toHaveClass('opacity-0');
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
});
