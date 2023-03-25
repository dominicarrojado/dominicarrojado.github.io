import { act, render, screen } from '@testing-library/react';
import { Router } from 'next/router';
import * as HeadlessTransition from '../headlessTransition';
import HeaderProgressBar from '../headerProgressBar';

describe('<HeaderProgressBar />', () => {
  const renderComponent = () => render(<HeaderProgressBar />);

  beforeEach(() => {
    jest
      .spyOn(HeadlessTransition, 'default')
      .mockImplementation(({ children }) => <>{children}</>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without errors by default', () => {
    renderComponent();

    const progressBarEl = screen.queryByRole('progressbar');

    expect(progressBarEl).toBeInTheDocument();
  });

  it('should render without errors on route change', () => {
    renderComponent();

    act(() => {
      const routerEvents = Router.events;

      routerEvents.emit('routeChangeStart');
      routerEvents.emit('routeChangeComplete');
      routerEvents.emit('routeChangeError');
    });

    const progressBarEl = screen.queryByRole('progressbar');

    expect(progressBarEl).toBeInTheDocument();
  });
});
