import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import Layout from '../layout';

describe('<Layout />', () => {
  it('should render children', () => {
    const text = getFakeSentence();

    render(<Layout>{text}</Layout>);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });
});
