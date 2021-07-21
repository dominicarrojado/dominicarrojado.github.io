import { describe, it } from '@jest/globals';
import { render } from '@testing-library/react';
import Index from '../index';

describe('Index component', () => {
  it('should render without error', () => {
    const { container } = render(<Index allPostsData={[]} />);

    expect(container).toBeInTheDocument();
  });
});
