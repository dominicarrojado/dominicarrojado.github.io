import { fireEvent, render, screen, act } from '@testing-library/react';
import Window from '@/modules/Window';
import * as imports from '@/lib/imports';
import * as ga from '@/lib/google-analytics';
import ScrollDownButton from '../scrollDownButton';

jest.mock('@/lib/imports', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/imports'),
}));
jest.mock('@/lib/google-analytics', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/google-analytics'),
}));

describe('<ScrollDownButton />', () => {
  const renderComponent = () => render(<ScrollDownButton />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should NOT import by default', () => {
    const getMoveToSpy = jest.spyOn(imports, 'getMoveTo');

    renderComponent();

    expect(getMoveToSpy).not.toBeCalled();
  });

  it('should import on window load', () => {
    const getMoveToSpy = jest.spyOn(imports, 'getMoveTo');

    renderComponent();

    act(() => {
      Window.emit('load');
    });

    expect(getMoveToSpy).toBeCalled();
  });

  it('should handle undefined MoveTo', () => {
    jest.spyOn(imports, 'getMoveTo').mockResolvedValue(undefined);

    const { container } = renderComponent();

    act(() => {
      Window.emit('load');
    });

    expect(container).toBeInTheDocument();
  });

  it('should track click', () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent();

    const btnText = 'Scroll Down';
    const btnEl = screen.queryByText(btnText);
    const anchorEl = btnEl?.closest('a') as HTMLAnchorElement;

    fireEvent.click(anchorEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'scroll_click',
      linkText: btnText,
    });
  });
});
