import { render } from '@testing-library/react';
import HeroBackground from '../heroBackground';

describe('<HeroBackground />', () => {
  it('should be visible without waiting for mount and animate in', () => {
    const { container } = render(<HeroBackground />);

    const containerEl = container.firstElementChild;

    expect(containerEl).not.toHaveClass('opacity-0');
    expect(containerEl).toHaveClass('motion-safe:animate-hero-background');
  });
});
