import { act, render, screen } from '@testing-library/react';
import { getDialogStateMock } from '@/lib/test-helpers';
import HeaderMenu, { Props } from '../headerMenu';

jest.useFakeTimers();

describe('<HeaderMenu />', () => {
  const renderComponent = (props: Props) => render(<HeaderMenu {...props} />);

  it('should be hidden if open is false', () => {
    renderComponent({
      dialog: getDialogStateMock({ open: false }),
    });

    const menuEl = screen.queryByTestId('menu-container');
    const backdropEl = screen.queryByTestId('menu-background');

    expect(menuEl).toHaveClass('w-0 h-0 pointer-events-none');
    expect(backdropEl).toHaveClass('opacity-0 pointer-events-none');
  });

  it('should NOT be hidden if open is true', () => {
    renderComponent({
      dialog: getDialogStateMock({ open: true }),
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const menuEl = screen.queryByTestId('menu-container');
    const backdropEl = screen.queryByTestId('menu-background');

    expect(menuEl).not.toHaveClass('w-0 h-0 pointer-events-none');
    expect(backdropEl).not.toHaveClass('opacity-0 pointer-events-none');
  });
});
