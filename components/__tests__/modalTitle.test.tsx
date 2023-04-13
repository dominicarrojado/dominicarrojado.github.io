import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '@/lib/test-helpers';
import ModalTitle, { Props } from '../modalTitle';

describe('<ModalTitle />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<ModalTitle>{children}</ModalTitle>);

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text });

    const el = screen.queryByText(text);

    expect(el?.tagName).toBe('H5');
  });
});
