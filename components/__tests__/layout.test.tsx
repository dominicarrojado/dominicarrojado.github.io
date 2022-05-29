import { render, screen } from '@testing-library/react';
import { getFakeSentence, getRandomRoute } from '../../lib/test-helpers';
import * as customHooks from '../../lib/custom-hooks';
import * as Header from '../header';
import * as Footer from '../footer';
import Layout from '../layout';

describe('<Layout />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children', () => {
    const text = getFakeSentence();

    render(<Layout route={getRandomRoute()}>{text}</Layout>);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  it('should render expected components', () => {
    // mock to prevent re-render of footer section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const headerSpy = jest.spyOn(Header, 'default');
    const footerSpy = jest.spyOn(Footer, 'default');

    render(<Layout route={getRandomRoute()}>{getFakeSentence()}</Layout>);

    expect(headerSpy).toBeCalledTimes(1);
    expect(footerSpy).toBeCalledTimes(1);
  });
});
