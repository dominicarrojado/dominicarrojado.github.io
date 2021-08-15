import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import ButtonArrowLink from '../buttonArrowLink';

describe('<ButtonArrowLink />', () => {
  const renderComponent = ({
    children,
    withIcon,
  }: {
    children: ReactNode;
    withIcon?: boolean;
  }) => {
    render(<ButtonArrowLink withIcon={withIcon}>{children}</ButtonArrowLink>);
  };

  describe('withIcon prop is undefined', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text });
    });

    it('should render children', () => {
      const btnEl = screen.queryByText(text);

      expect(btnEl?.tagName).toBe('BUTTON');
    });

    it('should render the icon by default', () => {
      const btnEl = screen.queryByText(text);
      const iconEl = btnEl?.querySelector('svg');

      expect(iconEl).toBeInTheDocument();
    });
  });

  describe('withIcon prop is false', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text, withIcon: false });
    });

    it('should render children', () => {
      const btnEl = screen.queryByText(text);

      expect(btnEl?.tagName).toBe('BUTTON');
    });

    it('should NOT render the icon', () => {
      const btnEl = screen.queryByText(text);
      const iconEl = btnEl?.querySelector('svg');

      expect(iconEl).not.toBeInTheDocument();
    });
  });
});
