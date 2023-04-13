import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { getFakeSentence } from '@/lib/test-helpers';
import TextArrowLink from '../textArrowLink';

describe('<TextArrowLink />', () => {
  const renderComponent = ({
    children,
    isExternal,
  }: {
    children: ReactNode;
    isExternal?: boolean;
  }) => {
    render(<TextArrowLink isExternal={isExternal}>{children}</TextArrowLink>);
  };

  describe('isExternal prop is undefined', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text });
    });

    it('should render children', () => {
      const anchorEl = screen.queryByText(text);

      expect(anchorEl?.tagName).toBe('A');
    });

    it('should NOT have external link attributes', () => {
      const anchorEl = screen.queryByText(text);

      expect(anchorEl).not.toHaveAttribute('target');
      expect(anchorEl).not.toHaveAttribute('rel');
    });
  });

  describe('isExternal prop is true', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text, isExternal: true });
    });

    it('should render children', () => {
      const anchorEl = screen.queryByText(text);

      expect(anchorEl?.tagName).toBe('A');
    });

    it('should have expected attributes', () => {
      const anchorEl = screen.queryByText(text);

      expect(anchorEl).toHaveAttribute('target', '_blank');
      expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
    });
  });
});
