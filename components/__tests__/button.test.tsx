import { render, screen } from '@testing-library/react';
import { getFakeString } from '@/lib/test-helpers';
import Button, { Props } from '../button';

describe('<Button />', () => {
  const renderComponent = ({ children, ...props }: Props) =>
    render(<Button {...props}>{children}</Button>);

  it('should render children', () => {
    const text = getFakeString();

    renderComponent({ children: text });

    const btnEl = screen.queryByText(text);

    expect(btnEl?.tagName).toBe('BUTTON');
  });

  it('should have default type', () => {
    const text = getFakeString();

    renderComponent({ children: text });

    const btnEl = screen.queryByText(text);

    expect(btnEl).toHaveAttribute('type', 'button');
  });
});
