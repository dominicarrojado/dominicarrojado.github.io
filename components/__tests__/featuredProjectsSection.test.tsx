import { render, screen } from '@testing-library/react';
import FeaturedProjectsSection from '../featuredProjectsSection';

describe('<FeaturedProjectsSection />', () => {
  beforeEach(() => {
    render(<FeaturedProjectsSection />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('Featured Projects');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content = "A selection of projects I've done so far.";

    expect(screen.queryByText(content)).toBeInTheDocument();
  });

  it('should have expected anchor', () => {
    const anchorEl = screen.queryByText('See All Projects');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/projects');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
