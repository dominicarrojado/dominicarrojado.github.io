import { fireEvent, render, screen } from '@testing-library/react';
import {
  fireEventTransitionEnd,
  getDialogStateMock,
  getFakeWord,
  getRandomRoute,
  setReadOnlyProperty,
} from '@/lib/test-helpers';
import * as nextRouter from 'next/router';
import * as customHooks from '@/lib/custom-hooks';
import * as ga from '@/lib/google-analytics';
import HeaderMenuButton, { Props } from '../headerMenuButton';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/lib/google-analytics', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/google-analytics'),
}));

describe('<HeaderMenuButton />', () => {
  const windowHeightOrig = window.innerHeight;
  const scrollYOrig = window.scrollY;
  const renderComponent = (props: Props) =>
    render(<HeaderMenuButton {...props} />);

  beforeEach(() => {
    jest
      .spyOn(nextRouter, 'useRouter')
      .mockReturnValue({ route: getRandomRoute() } as nextRouter.NextRouter);
  });

  afterEach(() => {
    jest.restoreAllMocks();

    setReadOnlyProperty(window, 'innerHeight', windowHeightOrig);
    setReadOnlyProperty(window, 'scrollY', scrollYOrig);
  });

  it('should have expected tag and attribute', () => {
    const { container } = renderComponent({
      dialog: getDialogStateMock(),
    });

    const btnEl = screen.queryByLabelText('Toggle menu');

    expect(btnEl?.isEqualNode(container.firstElementChild)).toBe(true);
    expect(btnEl?.tagName).toBe('BUTTON');
    expect(btnEl).toHaveAttribute('type', 'button');
  });

  it('should have expected class by default', () => {
    renderComponent({
      dialog: getDialogStateMock(),
    });

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-700');
    });
  });

  it('should have expected class on mount', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    renderComponent({
      dialog: { ...getDialogStateMock(), open: false },
    });

    const menuStackEls = screen.queryAllByTestId('menu-stack');
    const menuLabelEl = screen.queryByText('Menu');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).not.toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-700');
    });

    expect(menuLabelEl).not.toHaveClass('opacity-0');
  });

  it('should have expected class on transition end (opacity)', () => {
    renderComponent({
      dialog: { ...getDialogStateMock(), open: false },
    });

    const menuLabelEl = screen.queryByText('Menu') as HTMLDivElement;

    fireEventTransitionEnd(menuLabelEl, 'opacity');

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).not.toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-200');
    });
  });

  it('should have expected class on transition end (other prop name)', () => {
    renderComponent({
      dialog: { ...getDialogStateMock(), open: true },
    });

    const menuLabelEl = screen.queryByText('Close') as HTMLDivElement;

    fireEventTransitionEnd(menuLabelEl, getFakeWord());

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-700');
    });
  });

  it('should have expected class on transition end (opacity) and transition switch', () => {
    renderComponent({
      dialog: { ...getDialogStateMock(), open: false },
    });

    const menuLabelEl = screen.queryByText('Menu') as HTMLDivElement;

    fireEventTransitionEnd(menuLabelEl, 'opacity');

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).not.toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-200');
    });
  });

  it('should track click', () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent({
      dialog: { ...getDialogStateMock(), open: false },
    });

    const btnText = 'Menu';
    const btnEl = screen.queryByText(btnText) as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'header_btn_click',
      linkText: btnText,
    });
  });
});
