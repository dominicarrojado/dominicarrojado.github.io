import { render, screen } from '@testing-library/react';
import { queryByTextIgnoreHTML } from '../../lib/test-helpers';
import AboutMeSection from '../aboutMeSection';

describe('<AboutMeSection />', () => {
  beforeEach(() => {
    render(<AboutMeSection />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('About Me');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content1 =
      "I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end & back-end development. I'm experienced in developing small to large web applications.";
    const content2 =
      "I'm currently based in Singapore and working at PropertyGuru as a Senior Software Engineer (FinTech).";
    const anchorEl = screen.queryByText('PropertyGuru');

    expect(screen.queryByText(content1)).toBeInTheDocument();
    expect(queryByTextIgnoreHTML(screen, content2)).toBeInTheDocument();
    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute(
      'href',
      'https://www.propertyguru.com.sg/mortgage'
    );
    expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
    expect(anchorEl).toHaveAttribute('target', '_blank');
  });

  it('should have expected anchor', () => {
    const anchorEl = screen.queryByText('Read More');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/about-me');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
