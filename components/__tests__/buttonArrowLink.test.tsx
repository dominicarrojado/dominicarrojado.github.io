import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { getFakeBoolean, getFakeSentence } from '../../lib/test-helpers';
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

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text, withIcon: getFakeBoolean() });

    const btnEl = screen.queryByText(text);

    expect(btnEl?.tagName).toBe('BUTTON');
  });

  describe('withIcon prop is undefined', () => {
    const text = getFakeSentence();

    beforeEach(() => {
      renderComponent({ children: text });
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

    it('should NOT render the icon', () => {
      const btnEl = screen.queryByText(text);
      const iconEl = btnEl?.querySelector('svg');

      expect(iconEl).not.toBeInTheDocument();
    });
  });
});
