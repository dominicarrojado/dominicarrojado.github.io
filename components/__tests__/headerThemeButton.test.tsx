import { fireEvent, render, screen } from '@testing-library/react';
import { fireEventTransitionEnd, getFakeBoolean } from '../../lib/test-helpers';
import * as customHooks from '../../lib/custom-hooks';
import * as ga from '../../lib/google-analytics';
import HeaderThemeButton from '../headerThemeButton';

describe('<HeaderThemeButton />', () => {
  const renderComponent = () => render(<HeaderThemeButton />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should not render if dark mode is NOT ready', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: false,
      isDarkModeEnabled: getFakeBoolean(),
      toggleDarkMode: jest.fn(),
    });

    const { container } = renderComponent();

    expect(container.firstElementChild).not.toBeInTheDocument();
  });

  it('should have expected tag and attribute', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: getFakeBoolean(),
      toggleDarkMode: jest.fn(),
    });

    renderComponent();

    const btnEl = screen.queryByLabelText('Switch between dark and light mode');

    expect(btnEl?.tagName).toBe('BUTTON');
    expect(btnEl).toHaveAttribute('type', 'button');
  });

  it('should have expected text if dark mode is NOT enabled', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: false,
      toggleDarkMode: jest.fn(),
    });

    renderComponent();

    const btnEl = screen.queryByLabelText('Switch between dark and light mode');

    expect(btnEl).toHaveTextContent('Light');
  });

  it('should have expected text if dark mode is enabled', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: true,
      toggleDarkMode: jest.fn(),
    });

    renderComponent();

    const btnEl = screen.queryByLabelText('Switch between dark and light mode');

    expect(btnEl).toHaveTextContent('Dark');
  });

  it('should be hidden by default', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: true,
      toggleDarkMode: jest.fn(),
    });

    renderComponent();

    const btnLabelEl = screen.queryByText('Dark') as HTMLDivElement;
    const iconEl = btnLabelEl.previousElementSibling;

    expect(btnLabelEl).toHaveClass('opacity-0');
    expect(iconEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden on mount', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: false,
      toggleDarkMode: jest.fn(),
    });

    renderComponent();

    const btnLabelEl = screen.queryByText('Light') as HTMLDivElement;
    const iconEl = btnLabelEl.previousElementSibling;

    fireEventTransitionEnd(btnLabelEl, 'opacity');

    expect(btnLabelEl).not.toHaveClass('opacity-0');
    expect(iconEl).not.toHaveClass('opacity-0');
  });

  it('should track click (dark)', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: true,
      toggleDarkMode: jest.fn(),
    });

    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent();

    const btnText = 'Dark';
    const btnEl = screen.queryByText(btnText) as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'theme_btn_click',
      linkText: btnText,
    });
  });

  it('should track click (light)', () => {
    jest.spyOn(customHooks, 'useDarkModeEnabled').mockReturnValue({
      isDarkModeReady: true,
      isDarkModeEnabled: false,
      toggleDarkMode: jest.fn(),
    });

    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent();

    const btnText = 'Light';
    const btnEl = screen.queryByText(btnText) as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'theme_btn_click',
      linkText: btnText,
    });
  });
});
