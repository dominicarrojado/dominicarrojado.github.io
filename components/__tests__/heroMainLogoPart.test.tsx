import { render } from '@testing-library/react';
import HeroMainLogoPart, { Props } from '../heroMainLogoPart';

describe('<HeroMainLogoPart />', () => {
  const renderComponent = (props: Props) =>
    render(<HeroMainLogoPart {...props} />);

  it('should animate in from the left if left', () => {
    const { container } = renderComponent({ isLeft: true });

    const iconEl = container.firstElementChild;

    expect(iconEl).toHaveClass('motion-safe:animate-hero-logo-part-left-in');
  });

  it('should animate in from the right if right', () => {
    const { container } = renderComponent({ isLeft: false });

    const iconEl = container.firstElementChild;

    expect(iconEl).toHaveClass('motion-safe:animate-hero-logo-part-right-in');
  });

  it('should be visible without waiting for mount', () => {
    const { container } = renderComponent({});

    const iconEl = container.firstElementChild;

    expect(iconEl).toHaveClass('text-opacity-30');
    expect(iconEl).not.toHaveClass('text-opacity-0');
  });
});
