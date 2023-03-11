import { render } from '@testing-library/react';
import ButtonLoader from '../buttonLoader';

describe('<ButtonLoader />', () => {
  const renderComponent = () => render(<ButtonLoader />);

  it('should render without errors', () => {
    const { container } = renderComponent();

    expect(container).toBeInTheDocument();
  });
});
