import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { config } from 'react-transition-group';
import * as imports from '../../lib/imports';
import Window from '../../modules/Window';
import HeroMain, { ScrollDownButton } from '../heroMain';

config.disabled = true; // disable react-transitions-group transitions

describe('<HeroMain />', () => {
  beforeEach(() => {
    render(<HeroMain />);
  });

  describe('content and tags', () => {
    it('should have expected title', () => {
      const title = 'Dominic Arrojado · Senior Software Engineer';
      const titleEl = screen.queryByText(title);

      expect(titleEl?.tagName).toBe('H1');
    });

    it('should have expected scroll down text', () => {
      const btnTextEl = screen.queryByText('Scroll Down');

      expect(btnTextEl?.parentElement?.tagName).toBe('A');
    });
  });

  describe('window is NOT loaded', () => {
    it('should display spinner', () => {
      const spinnerEl = screen.queryByTestId('spinner');

      expect(spinnerEl).toBeInTheDocument();
    });

    it('should hide background', () => {
      const backgroundEl = screen.queryByTestId('background');

      expect(backgroundEl).toHaveClass('opacity-0');
    });

    it('should hide logo', () => {
      const logoEl = screen.queryByTestId('logo');
      const logoPart1El = screen.queryByTestId('logo-part-1');
      const logoPart2El = screen.queryByTestId('logo-part-2');

      expect(logoEl).toHaveClass('opacity-0');
      expect(logoPart1El).toHaveClass('opacity-0');
      expect(logoPart2El).toHaveClass('opacity-0');
    });

    it('should hide title', () => {
      const titleEl = screen.queryByTestId('title');

      expect(titleEl).toHaveClass('opacity-0');
    });

    it('should hide scroll down button', () => {
      const scrollDownBtnEl = screen.queryByTestId('scroll-down-btn');

      expect(scrollDownBtnEl).toHaveClass('opacity-0');
    });

    it('should not import MoveTo', () => {
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

    it('should hide spinner', () => {
      const spinnerEl = screen.queryByTestId('spinner');

      expect(spinnerEl).not.toBeInTheDocument();
    });

    it('should display background', () => {
      const backgroundEl = screen.queryByTestId('background');

      expect(backgroundEl).not.toHaveClass('opacity-0');
    });

    it('should display logo', () => {
      const logoEl = screen.queryByTestId('logo');
      const logoPart1El = screen.queryByTestId('logo-part-1');
      const logoPart2El = screen.queryByTestId('logo-part-2');

      expect(logoEl).not.toHaveClass('opacity-0');
      expect(logoPart1El).not.toHaveClass('opacity-0');
      expect(logoPart2El).not.toHaveClass('opacity-0');
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
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle undefined MoveTo', () => {
    jest.spyOn(imports, 'getMoveTo').mockResolvedValue(undefined);

    const { container } = render(<ScrollDownButton shouldShow />);

    expect(container).toBeInTheDocument();
  });
});
