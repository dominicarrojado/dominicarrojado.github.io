import { render, screen } from '@testing-library/react';
import { AppProps } from 'next/app';
import {
  getFakeJson,
  getFakeSentence,
  getRandomRoute,
} from '../../lib/test-helpers';
import * as Layout from '../../components/layout';
import App from '../_app.page';

describe('<App />', () => {
  const renderComponent = (appProps: AppProps) => {
    render(<App {...appProps} />);
  };

  it('should render with layout', () => {
    const layoutSpy = jest.spyOn(Layout, 'default');
    const route = getRandomRoute();

    renderComponent({
      router: { route },
      Component: jest.fn(() => <>{getFakeSentence()}</>),
    } as any);

    expect(layoutSpy).toBeCalledTimes(1);
    expect(layoutSpy).toBeCalledWith(expect.objectContaining({ route }), {});
  });

  it('should render Component prop', () => {
    const text = getFakeSentence();
    const children = <>{text}</>;
    const componentSpy = jest.fn(() => children);
    const pageProps = getFakeJson();

    renderComponent({
      pageProps,
      router: { route: getRandomRoute() },
      Component: componentSpy,
    } as any);

    expect(componentSpy).toBeCalledTimes(1);
    expect(componentSpy).toBeCalledWith(pageProps, {});
    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
