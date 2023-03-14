import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import ModalDialog, { Props } from '../modalDialog';

describe('<ModalDialog />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<ModalDialog>{children}</ModalDialog>);

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text });

    const el = screen.queryByText(text);

    expect(el).toBeInTheDocument();
  });
});
