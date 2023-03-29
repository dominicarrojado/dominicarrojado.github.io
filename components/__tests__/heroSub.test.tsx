import { render, screen, act } from '@testing-library/react';
import { config } from 'react-transition-group';
import { getFakeSentence, getFakeSentences } from '../../lib/test-helpers';
import Window from '../../modules/Window';
import * as customHooks from '../../lib/custom-hooks';
import HeroSub, { Props } from '../heroSub';

config.disabled = true; // disable react-transitions-group transitions

describe('<HeroSub />', () => {
  const renderComponent = (props: Props, isMounted = false) => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);

    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(isMounted);

    return render(<HeroSub {...props} />);
  };

  describe('content', () => {
    const title = getFakeSentence();
    const description = getFakeSentences();

    beforeEach(() => {
      renderComponent({
        title,
        description,
      });
    });

    it('should have expected title', () => {
      const titleEl = screen.queryByText(title);

      expect(titleEl?.tagName).toBe('H1');
    });

    it('should have expected description', () => {
      const descEl = screen.queryByText(description);

      expect(descEl).toBeInTheDocument();
    });
  });

  describe('animations on mount', () => {
    const title = getFakeSentence();
    const description = getFakeSentences();

    describe('isMounted is false', () => {
      beforeEach(() => {
        renderComponent({ title, description });
      });

      it('should NOT display title', () => {
        const titleEl = screen.queryByText(title);

        expect(titleEl).toHaveClass('opacity-0');
      });

      it('should NOT display description', () => {
        const descEl = screen.queryByText(description);

        expect(descEl).toHaveClass('opacity-0');
      });
    });

    describe('isMounted is true', () => {
      beforeEach(() => {
        renderComponent({ title, description }, true);
      });

      it('should display title', () => {
        const titleEl = screen.queryByText(title);

        expect(titleEl).not.toHaveClass('opacity-0');
      });

      it('should display description', () => {
        const descEl = screen.queryByText(description);

        expect(descEl).not.toHaveClass('opacity-0');
      });
    });
  });

  describe('background', () => {
    beforeEach(() => {
      renderComponent({
        title: getFakeSentence(),
        description: getFakeSentences(),
      });
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

  describe('isMinHeightFull prop', () => {
    test('should have smaller min height by default', () => {
      renderComponent({
        title: getFakeSentence(),
        description: getFakeSentences(),
      });

      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('min-h-96');
      expect(containerEl).not.toHaveClass('min-h-full');
    });

    test('should have full min height if isMinHeightFull is true', () => {
      renderComponent({
        title: getFakeSentence(),
        description: getFakeSentences(),
        isMinHeightFull: true,
      });

      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('min-h-full');
      expect(containerEl).not.toHaveClass('min-h-96');
    });
  });
});
