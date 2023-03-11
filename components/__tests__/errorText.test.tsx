import { render, screen } from '@testing-library/react';
import { getFakeString } from '../../lib/test-helpers';
import ErrorText, { Props } from '../errorText';

describe('<ErrorText />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<ErrorText>{children}</ErrorText>);

  it('should render children', () => {
    const text = getFakeString();

    renderComponent({ children: text });

    const el = screen.queryByText(text);

    expect(el).toBeInTheDocument();
  });
});
