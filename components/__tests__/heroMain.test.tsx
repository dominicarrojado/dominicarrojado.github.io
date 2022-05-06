import { fireEvent, render, screen, act } from '@testing-library/react';
import { config } from 'react-transition-group';
import Window from '../../modules/Window';
import * as customHooks from '../../lib/custom-hooks';
import * as imports from '../../lib/imports';
import * as ga from '../../lib/google-analytics';
import HeroMain from '../heroMain';

config.disabled = true; // disable react-transitions-group transitions

describe('<HeroMain />', () => {
  const renderComponent = (isMounted = false) => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(isMounted);

    return render(<HeroMain />);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('content and tags', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should have expected title', () => {
      const title = 'Guides, Tips and Tricks to Web Development';
      const titleEl = screen.queryByText(title);

      expect(titleEl?.tagName).toBe('H1');
    });

    it('should have expected scroll down text', () => {
      const btnTextEl = screen.queryByText('Scroll Down');
      const scrollDownBtnEl = btnTextEl?.parentElement;

      expect(scrollDownBtnEl?.tagName).toBe('A');
    });
  });

  describe('animations on mount', () => {
    describe('isMounted is false', () => {
      beforeEach(() => {
        renderComponent();
      });

      it('should NOT display container', () => {
        const containerEl = screen.queryByTestId('container');

        expect(containerEl).not.toHaveClass('translate-y-0');
      });

      it('should NOT display logo', () => {
        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');
        const logoPartEls = screen.queryAllByTestId('logo-part');

        expect(logoEl).toHaveClass('opacity-0');
        expect(logoPartEls).toHaveLength(2);

        logoPartEls.forEach((logoPartEl) => {
          expect(logoPartEl).toHaveClass('opacity-0');
        });
      });

      it('should NOT display title', () => {
        const titleEl = screen.queryByTestId('title');

        expect(titleEl).toHaveClass('opacity-0');
      });

      it('should NOT display scroll down button', () => {
        const scrollDownBtnEl = screen.queryByTestId('scroll-down-btn');

        expect(scrollDownBtnEl).toHaveClass('opacity-0');
      });
    });

    describe('isMounted is true', () => {
      beforeEach(() => {
        renderComponent(true);
      });

      it('should display container', () => {
        const containerEl = screen.queryByTestId('container');

        expect(containerEl).toHaveClass('translate-y-0');
      });

      it('should display logo', () => {
        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');
        const logoPartEls = screen.queryAllByTestId('logo-part');

        expect(logoEl).not.toHaveClass('opacity-0');
        expect(logoPartEls).toHaveLength(2);

        logoPartEls.forEach((logoPartEl) => {
          expect(logoPartEl).not.toHaveClass('opacity-0');
        });
      });

      it('should display title', () => {
        const titleEl = screen.queryByTestId('title');

        expect(titleEl).not.toHaveClass('opacity-0');
      });

      it('should display scroll down button', () => {
        const scrollDownBtnEl = screen.queryByTestId('scroll-down-btn');

        expect(scrollDownBtnEl).not.toHaveClass('opacity-0');
      });
    });
  });

  describe('background', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should NOT display by default', () => {
      const backgroundEl = screen.queryByTestId('background');

      expect(backgroundEl).toHaveClass('opacity-0');
    });

    it('should display on window load', () => {
      act(() => {
        Window.emit('load');
      });

      const backgroundEl = screen.queryByTestId('background');

      expect(backgroundEl).not.toHaveClass('opacity-0');
    });
  });

  describe('MoveTo', () => {
    it('should NOT import by default', () => {
      const getMoveToSpy = jest.spyOn(imports, 'getMoveTo');

      renderComponent();

      expect(getMoveToSpy).not.toBeCalled();
    });

    it('should import on window load', () => {
      const getMoveToSpy = jest.spyOn(imports, 'getMoveTo');

      renderComponent();

      act(() => {
        Window.emit('load');
      });

      expect(getMoveToSpy).toBeCalled();
    });
  });

  describe('<ScrollDownButton />', () => {
    it('should handle undefined MoveTo', () => {
      jest.spyOn(imports, 'getMoveTo').mockResolvedValue(undefined);

      const { container } = renderComponent();

      act(() => {
        Window.emit('load');
      });

      expect(container).toBeInTheDocument();
    });

    describe('analytics', () => {
      beforeEach(() => {
        renderComponent();
      });

      it('should track as hover if NOT clicked', () => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const btnEl = screen.queryByText('Scroll Down');
        const anchorEl = btnEl?.closest('a') as HTMLAnchorElement;

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).toBeCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          event: 'scroll_hover',
          hoverText: 'Scroll Down',
        });
      });

      it('should track click', () => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const btnEl = screen.queryByText('Scroll Down');
        const anchorEl = btnEl?.closest('a') as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(trackEventSpy).toBeCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          event: 'scroll_click',
          linkText: 'Scroll Down',
        });
      });

      it('should NOT track as hover if clicked', () => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const btnEl = screen.queryByText('Scroll Down');
        const anchorEl = btnEl?.closest('a') as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        trackEventSpy.mockClear();

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).not.toBeCalled();
      });
    });
  });
});
