import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import ModalDescription, { Props } from '../modalDescription';

describe('<ModalDescription />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<ModalDescription>{children}</ModalDescription>);

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text });

    const el = screen.queryByText(text);

    expect(el?.tagName).toBe('P');
  });
});
