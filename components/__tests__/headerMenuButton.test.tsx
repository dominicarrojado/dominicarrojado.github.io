import { fireEvent, render, screen } from '@testing-library/react';
import { config } from 'react-transition-group';
import {
  fireEventTransitionEnd,
  getDialogStateMock,
  getFakeWord,
  getRandomRoute,
  setReadOnlyProperty,
} from '../../lib/test-helpers';
import * as nextRouter from 'next/router';
import * as customHooks from '../../lib/custom-hooks';
import * as ga from '../../lib/google-analytics';
import * as transitionUtils from '../../lib/transition-group';
import HeaderMenuButton, { Props } from '../headerMenuButton';

config.disabled = true; // disable react-transitions-group transitions

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
      expect(stackEl).toHaveClass('duration-1000');
    });
  });

  it('should have expected class on mount', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: false },
    });

    const menuStackEls = screen.queryAllByTestId('menu-stack');
    const menuLabelEl = screen.queryByText('Menu');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).not.toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-1000');
    });

    expect(menuLabelEl).not.toHaveClass('opacity-0');
  });

  it('should have expected class on transition end (opacity)', () => {
    renderComponent({
      dialog: { ...getDialogStateMock(), visible: false },
    });

    const menuLabelEl = screen.queryByText('Menu') as HTMLDivElement;

    fireEventTransitionEnd(menuLabelEl, 'opacity');

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).not.toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-300');
    });
  });

  it('should have expected class on transition end (other prop name)', () => {
    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
    });

    const menuLabelEl = screen.queryByText('Close') as HTMLDivElement;

    fireEventTransitionEnd(menuLabelEl, getFakeWord());

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-1000');
    });
  });

  it('should have expected class on transition end (opacity) and transition switch', () => {
    jest.spyOn(transitionUtils, 'checkShouldAnimate').mockReturnValue(false);

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: false },
    });

    const menuLabelEl = screen.queryByText('Menu') as HTMLDivElement;

    fireEventTransitionEnd(menuLabelEl, 'opacity');

    const menuStackEls = screen.queryAllByTestId('menu-stack');

    expect(menuStackEls).toHaveLength(3);

    menuStackEls.forEach((stackEl) => {
      expect(stackEl).not.toHaveClass('opacity-0');
      expect(stackEl).toHaveClass('duration-300');
    });
  });

  it('should track click', () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: false },
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
