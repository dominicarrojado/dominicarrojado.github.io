import { render } from '@testing-library/react';
import Index, { getStaticProps } from '../index';

describe('<Index />', () => {
  it('should render without errors', () => {
    const { container } = render(<Index />);

    expect(container).toBeInTheDocument();
  });
});

describe('getStaticProps()', () => {
  it('should return expected value', async () => {
    const staticProps = await getStaticProps({});
    const expectedProps = { props: {} };

    expect(staticProps).toEqual(expectedProps);
  });
});
