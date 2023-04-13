import { act, fireEvent, render } from '@testing-library/react';
import Window from '@/modules/Window';
import {
  getFakeNumber,
  getRandomRoute,
  setReadOnlyProperty,
} from '@/lib/test-helpers';
import { Route } from '@/lib/types';
import * as nextRouter from 'next/router';
import * as customHooks from '@/lib/custom-hooks';
import * as NextLink from '../nextLink';
import HeaderLogo, { Props } from '../headerLogo';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../nextLink', () => ({
  __esModule: true,
  ...jest.requireActual('../nextLink'),
}));

describe('<HeaderLogo />', () => {
  const windowHeightOrig = window.innerHeight;
  const scrollYOrig = window.scrollY;
  const renderComponent = (props: Props) => render(<HeaderLogo {...props} />);

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
      onClick: jest.fn(),
    });

    const anchorEl = container.firstElementChild;

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', Route.HOME);
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });

  it('should handle on click', () => {
    jest
      .spyOn(NextLink, 'default')
      .mockImplementation(({ children }) => <>{children}</>);

    const onClickMock = jest.fn();

    const { container } = renderComponent({ onClick: onClickMock });
    const anchorEl = container.firstElementChild as HTMLAnchorElement;

    act(() => {
      fireEvent.click(anchorEl);
    });

    expect(onClickMock).toBeCalledTimes(1);
  });

  it('should have expected class if route is home', () => {
    jest
      .spyOn(nextRouter, 'useRouter')
      .mockReturnValue({ route: Route.HOME } as nextRouter.NextRouter);

    const { container } = renderComponent({ onClick: jest.fn() });
    const anchorEl = container.firstElementChild as HTMLAnchorElement;

    expect(anchorEl).toHaveClass('opacity-0');
  });

  it('should have expected class on scroll', async () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);
    jest.spyOn(nextRouter, 'useRouter').mockReturnValue({
      route: Route.HOME,
    } as nextRouter.NextRouter);

    const { container } = renderComponent({ onClick: jest.fn() });
    const anchorEl = container.firstElementChild as HTMLAnchorElement;

    expect(anchorEl).toHaveClass('opacity-0');

    const windowHeight = getFakeNumber();
    const scrollY = getFakeNumber({ min: windowHeight });

    setReadOnlyProperty(window, 'innerHeight', windowHeight);
    setReadOnlyProperty(window, 'scrollY', scrollY);

    act(() => {
      Window.emit('scroll');
    });

    expect(anchorEl).not.toHaveClass('opacity-0');
  });

  it('should have expected class on focus/blur', async () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);
    jest.spyOn(nextRouter, 'useRouter').mockReturnValue({
      route: Route.HOME,
    } as nextRouter.NextRouter);

    const { container } = renderComponent({ onClick: jest.fn() });
    const anchorEl = container.firstElementChild as HTMLAnchorElement;

    expect(anchorEl).toHaveClass('opacity-0');

    act(() => {
      fireEvent.focus(anchorEl);
    });

    expect(anchorEl).not.toHaveClass('opacity-0');

    act(() => {
      fireEvent.blur(anchorEl);
    });

    expect(anchorEl).toHaveClass('opacity-0');
  });
});
