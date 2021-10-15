import { fireEvent, render, screen, act } from '@testing-library/react';
import { config } from 'react-transition-group';
import Window from '../../modules/Window';
import * as imports from '../../lib/imports';
import * as ga from '../../lib/google-analytics';
import HeroMain from '../heroMain';

config.disabled = true; // disable react-transitions-group transitions

describe('<HeroMain />', () => {
  beforeEach(() => {
    render(<HeroMain />);
  });

  describe('content and tags', () => {
    it('should have expected title', () => {
      const title = 'Guides, Tips and Tricks to Web Development';
      const titleEl = screen.queryByText(title);

      expect(titleEl?.tagName).toBe('H1');
    });

    it('should have expected scroll down text', () => {
      const btnTextEl = screen.queryByText('Scroll Down');

      expect(btnTextEl?.parentElement?.tagName).toBe('A');
    });
  });

  describe('window is NOT loaded', () => {
    it('should display container', () => {
      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('translate-y-0');
    });

    it('should display spinner', () => {
      const spinnerEl = screen.queryByTestId('spinner');

      expect(spinnerEl).toBeInTheDocument();
    });

    it('should hide background', () => {
      const backgroundEl = screen.queryByTestId('background');

      expect(backgroundEl).toHaveClass('opacity-0');
    });

    it('should hide logo', () => {
      const logoEl = screen.queryByLabelText('Dominic Arrojado logo');
      const logoPartEls = screen.queryAllByTestId('logo-part');

      expect(logoEl).toHaveClass('opacity-0');
      expect(logoPartEls).toHaveLength(2);

      logoPartEls.forEach((logoPartEl) => {
        expect(logoPartEl).toHaveClass('opacity-0');
      });
    });

    it('should hide title', () => {
      const titleEl = screen.queryByTestId('title');

      expect(titleEl).toHaveClass('opacity-0');
    });

    it('should hide scroll down button', () => {
      const scrollDownBtnEl = screen.queryByTestId('scroll-down-btn');

      expect(scrollDownBtnEl).toHaveClass('opacity-0');
    });

    it('should NOT import MoveTo', () => {
      const getMoveToSpy = jest.spyOn(imports, 'getMoveTo');

      expect(getMoveToSpy).not.toBeCalled();
    });
  });

  describe('window is loaded', () => {
    beforeEach(() => {
      act(() => {
        Window.emit('load');
      });
    });

    it('should display container', () => {
      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('translate-y-0');
    });

    it('should hide spinner', () => {
      const spinnerEl = screen.queryByTestId('spinner');

      expect(spinnerEl).not.toBeInTheDocument();
    });

    it('should display background', () => {
      const backgroundEl = screen.queryByTestId('background');

      expect(backgroundEl).not.toHaveClass('opacity-0');
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

    it('should import MoveTo', () => {
      const getMoveToSpy = jest.spyOn(imports, 'getMoveTo');

      expect(getMoveToSpy).toBeCalled();
    });
  });
});

describe('<ScrollDownButton />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle undefined MoveTo', () => {
    jest.spyOn(imports, 'getMoveTo').mockResolvedValue(undefined);

    const { container } = render(<HeroMain />);

    act(() => {
      Window.emit('load');
    });

    expect(container).toBeInTheDocument();
  });

  describe('analytics', () => {
    beforeEach(() => {
      render(<HeroMain />);
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
