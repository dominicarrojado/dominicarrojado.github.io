import { render, screen } from '@testing-library/react';
import { getFakeSentence, getRandomRoute } from '@/lib/test-helpers';
import * as nextRouter from 'next/router';
import * as customHooks from '@/lib/custom-hooks';
import * as Header from '../header';
import * as Footer from '../footer';
import Layout, { Props } from '../layout';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../header', () => ({
  __esModule: true,
  ...jest.requireActual('../header'),
}));
jest.mock('../footer', () => ({
  __esModule: true,
  ...jest.requireActual('../footer'),
}));

describe('<Layout />', () => {
  const renderComponent = ({ children, ...props }: Props) =>
    render(<Layout {...props}>{children}</Layout>);

  beforeEach(() => {
    jest
      .spyOn(nextRouter, 'useRouter')
      .mockReturnValue({ route: getRandomRoute() } as nextRouter.NextRouter);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({
      route: getRandomRoute(),
      children: text,
    });

    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  it('should render expected components', () => {
    // mock to prevent re-render of footer section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const headerSpy = jest.spyOn(Header, 'default');
    const footerSpy = jest.spyOn(Footer, 'default');

    renderComponent({
      route: getRandomRoute(),
      children: getFakeSentence(),
    });

    expect(headerSpy).toBeCalled();
    expect(footerSpy).toBeCalled();
  });
});
