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
      'My name is Dominic Arrojado. I write tech blogs and create videos to share my knowledge and learnings in my web development experiences. I hope it will benefit and help some of you folks out here.';
    const content2 =
      "I'm a web developer specializing in both front-end and back-end development. I'm experienced in developing small to large web applications.";
    const content3 =
      "I'm currently based in Singapore and working at PropertyGuru Finance as a Senior Software Engineer.";

    expect(queryByTextIgnoreHTML(screen, content1)).toBeInTheDocument();
    expect(screen.queryByText(content2)).toBeInTheDocument();
    expect(queryByTextIgnoreHTML(screen, content3)).toBeInTheDocument();
  });

  it('should have expected anchors', () => {
    const footerAnchorEl = screen.queryByText('Read More');
    const pgfAnchorEl = screen.queryByText('PropertyGuru Finance');
    const youtubeAnchorEl = screen.queryByText('videos');
    const externalLinkEls = [pgfAnchorEl, youtubeAnchorEl];

    expect(footerAnchorEl?.tagName).toBe('A');
    expect(footerAnchorEl).toHaveAttribute('href', '/about');
    expect(footerAnchorEl).not.toHaveAttribute('rel');
    expect(footerAnchorEl).not.toHaveAttribute('target');

    externalLinkEls.forEach((externalLinkEl) => {
      expect(externalLinkEl?.tagName).toBe('A');
      expect(externalLinkEl).toHaveAttribute(
        'rel',
        'noopener noreferrer nofollow'
      );
      expect(externalLinkEl).toHaveAttribute('target', '_blank');
    });

    expect(pgfAnchorEl).toHaveAttribute(
      'href',
      'https://www.propertyguru.com.sg/mortgage'
    );

    expect(youtubeAnchorEl).toHaveAttribute(
      'href',
      'https://www.youtube.com/channel/UCWwV__qrzg5BYCSwO91Xhxg'
    );
  });
});
