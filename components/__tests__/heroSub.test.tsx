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

  describe('window is NOT loaded', () => {
    beforeEach(() => {
      renderComponent();
    });

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

    it('should hide title', () => {
      const titleEl = screen.queryByText(title);

      expect(titleEl).toHaveClass('opacity-0');
    });

    it('should hide description', () => {
      const descEl = screen.queryByText(desc);

      expect(descEl).toHaveClass('opacity-0');
    });
  });

  describe('window is loaded', () => {
    beforeEach(() => {
      renderComponent();

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

    it('should display title', () => {
      const titleEl = screen.queryByText(title);

      expect(titleEl).not.toHaveClass('opacity-0');
    });

    it('should display title', () => {
      const descEl = screen.queryByText(desc);

      expect(descEl).not.toHaveClass('opacity-0');
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
