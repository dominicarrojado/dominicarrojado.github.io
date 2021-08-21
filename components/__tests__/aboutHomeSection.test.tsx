import { render, screen } from '@testing-library/react';
import { queryByTextIgnoreHTML } from '../../lib/test-helpers';
import AboutHomeSection from '../aboutHomeSection';

describe('<AboutHomeSection />', () => {
  beforeEach(() => {
    render(<AboutHomeSection />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('About Me');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content1 =
      "I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end & back-end development. I'm experienced in developing small to large web applications.";
    const content2 =
      "I'm currently based in Singapore and working at PropertyGuru Finance as a Senior Software Engineer.";
    const content3 =
      'I write tech blogs and create video tutorials to share my knowledge and learnings in my web development experiences. I hope it will benefit and help some of you folks out here.';
    const anchorEl = screen.queryByText('PropertyGuru Finance');

    expect(screen.queryByText(content1)).toBeInTheDocument();
    expect(queryByTextIgnoreHTML(screen, content2)).toBeInTheDocument();
    expect(queryByTextIgnoreHTML(screen, content3)).toBeInTheDocument();
    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute(
      'href',
      'https://www.propertyguru.com.sg/mortgage'
    );
    expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
    expect(anchorEl).toHaveAttribute('target', '_blank');
  });

  it('should have expected anchors', () => {
    const pgfAnchorEl = screen.queryByText('PropertyGuru Finance');
    const footerAnchorEl = screen.queryByText('Read More');
    const linkEls = [pgfAnchorEl, footerAnchorEl];

    linkEls.forEach((linkEl) => {
      expect(linkEl?.tagName).toBe('A');
    });

    expect(pgfAnchorEl).toHaveAttribute(
      'href',
      'https://www.propertyguru.com.sg/mortgage'
    );
    expect(pgfAnchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
    expect(pgfAnchorEl).toHaveAttribute('target', '_blank');

    expect(footerAnchorEl).toHaveAttribute('href', '/about');
    expect(footerAnchorEl).not.toHaveAttribute('rel');
    expect(footerAnchorEl).not.toHaveAttribute('target');
  });
});
