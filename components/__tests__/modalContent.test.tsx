import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '@/lib/test-helpers';
import ModalContent, { Props } from '../modalContent';

describe('<ModalContent />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<ModalContent>{children}</ModalContent>);

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text });

    const el = screen.queryByText(text);

    expect(el).toBeInTheDocument();
  });
});
