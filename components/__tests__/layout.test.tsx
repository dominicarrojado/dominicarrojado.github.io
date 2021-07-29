import { render, screen } from '@testing-library/react';
import * as Head from 'next/head';
import { getFakeSentence } from '../../lib/test-helpers';
import * as Header from '../header';
import * as Footer from '../footer';
import Layout from '../layout';

describe('<Layout />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children', () => {
    const text = getFakeSentence();

    render(<Layout>{text}</Layout>);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });

  it('should render expected components', () => {
    const headSpy = jest.spyOn(Head, 'default');
    const headerSpy = jest.spyOn(Header, 'default');
    const footerSpy = jest.spyOn(Footer, 'default');

    render(<Layout>{getFakeSentence()}</Layout>);

    expect(headSpy).toBeCalledTimes(1);
    expect(headerSpy).toBeCalledTimes(1);
    expect(footerSpy).toBeCalledTimes(1);
  });
});
