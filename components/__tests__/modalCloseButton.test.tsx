import { fireEvent, render, screen } from '@testing-library/react';
import { getFakeWord } from '../../lib/test-helpers';
import ModalCloseButton, { Props } from '../modalCloseButton';

describe('<ModalCloseButton />', () => {
  const renderComponent = (props: Props) =>
    render(<ModalCloseButton {...props} />);

  it('should have expected tagName and attribute', () => {
    renderComponent({});

    const btnEl = screen.queryByLabelText('Close');

    expect(btnEl?.tagName).toBe('BUTTON');
    expect(btnEl).toHaveAttribute('type', 'button');
    expect(btnEl).toHaveTextContent('close');
  });

  it('should accept className prop', () => {
    const className = getFakeWord();

    renderComponent({ className });

    const btnEl = screen.queryByLabelText('Close');

    expect(btnEl).toHaveClass(className);
  });

  it('should accept onClick prop', () => {
    const onClickMock = jest.fn();

    renderComponent({ onClick: onClickMock });

    const btnEl = screen.queryByLabelText('Close') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(onClickMock).toBeCalledTimes(1);
  });
});
