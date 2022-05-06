import { render, screen, act } from '@testing-library/react';
import { config } from 'react-transition-group';
import Window from '../../modules/Window';
import HeroSub from '../heroSub';
import { getFakeSentence, getFakeSentences } from '../../lib/test-helpers';

config.disabled = true; // disable react-transitions-group transitions

describe('<HeroSub />', () => {
  const title = getFakeSentence();
  const desc = getFakeSentences();
  const renderComponent = (isMinHeightFull?: boolean) => {
    render(
      <HeroSub
        title={title}
        description={desc}
        isMinHeightFull={isMinHeightFull}
      />
    );
  };

  describe('content', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should render title', () => {
      const titleEl = screen.queryByText(title);

      expect(titleEl?.tagName).toBe('H1');
    });

    it('should render description', () => {
      const descEl = screen.queryByText(desc);

      expect(descEl).toBeInTheDocument();
    });
  });

  describe('animations on mount', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should display container', () => {
      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('translate-y-0');
    });

    it('should display title', () => {
      const titleEl = screen.queryByText(title);

      expect(titleEl).not.toHaveClass('opacity-0');
    });

    it('should display description', () => {
      const descEl = screen.queryByText(desc);

      expect(descEl).not.toHaveClass('opacity-0');
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

  describe('isMinHeightFull prop', () => {
    test('should have smaller min height by default', () => {
      renderComponent();

      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('min-h-96');
      expect(containerEl).not.toHaveClass('min-h-full');
    });

    test('should have full min height if isMinHeightFull is true', () => {
      renderComponent(true);

      const containerEl = screen.queryByTestId('container');

      expect(containerEl).toHaveClass('min-h-full');
      expect(containerEl).not.toHaveClass('min-h-96');
    });
  });
});
