import { render, screen } from '@testing-library/react';
import BlogSection from '../blogSection';

describe('<BlogSection />', () => {
  beforeEach(() => {
    render(<BlogSection />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('Blog');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content =
      'A place to share my knowledge and learnings from my web development experiences.';

    expect(screen.queryByText(content)).toBeInTheDocument();
  });

  it('should have expected anchor', () => {
    const anchorEl = screen.queryByText('See All Blog');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/posts');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
