import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '@/lib/test-helpers';
import InputGroup, { Props } from '../inputGroup';

describe('<InputGroup />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<InputGroup>{children}</InputGroup>);

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text });

    const el = screen.queryByText(text);

    expect(el).toBeInTheDocument();
  });
});
