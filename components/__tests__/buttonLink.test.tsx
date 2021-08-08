import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import ButtonLink from '../buttonLink';

describe('<ButtonLink />', () => {
  const renderComponent = ({
    children,
    withIcon,
  }: {
    children: ReactNode;
    withIcon?: boolean;
  }) => {
    render(<ButtonLink withIcon={withIcon}>{children}</ButtonLink>);
  };

  describe('withIcon prop is undefined', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text });
    });

    it('should render children', () => {
      const anchorEl = screen.queryByText(text);

      expect(anchorEl?.tagName).toBe('BUTTON');
    });

    it('should render the icon by default', () => {
      const anchorEl = screen.queryByText(text);
      const iconEl = anchorEl?.querySelector('svg');

      expect(iconEl).toBeInTheDocument();
    });
  });

  describe('withIcon prop is false', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text, withIcon: false });
    });

    it('should render children', () => {
      const anchorEl = screen.queryByText(text);

      expect(anchorEl?.tagName).toBe('BUTTON');
    });

    it('should NOT render the icon', () => {
      const anchorEl = screen.queryByText(text);
      const iconEl = anchorEl?.querySelector('svg');

      expect(iconEl).not.toBeInTheDocument();
    });
  });
});
