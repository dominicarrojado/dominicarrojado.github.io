import { render, screen, act } from '@testing-library/react';
import Window from '../../modules/Window';
import AboutSection from '../aboutSection';

describe('<AboutSection />', () => {
  beforeEach(() => {
    render(<AboutSection />);
  });

  it('should have expected anchor', () => {
    const blogAnchorEl = screen.queryByText('tech blogs');
    const pgfAnchorEls = screen.queryAllByText('PropertyGuru Finance');
    const pggAnchorEl = screen.queryByText('PropertyGuru Group');
    const netflixAnchorEl = screen.queryByText('Netflix');
    const playlistAnchorEl = screen.queryByText('Spotify playlists');
    const duolingoAnchorEl = screen.queryByText('Duolingo');
    const externalLinkEls = [
      ...pgfAnchorEls,
      pggAnchorEl,
      netflixAnchorEl,
      playlistAnchorEl,
      duolingoAnchorEl,
    ];

    expect(blogAnchorEl?.tagName).toBe('A');
    expect(blogAnchorEl).not.toHaveAttribute('rel');
    expect(blogAnchorEl).not.toHaveAttribute('target');

    externalLinkEls.forEach((externalLinkEl) => {
      expect(externalLinkEl?.tagName).toBe('A');
      expect(externalLinkEl).toHaveAttribute(
        'rel',
        'noopener noreferrer nofollow'
      );
      expect(externalLinkEl).toHaveAttribute('target', '_blank');
    });

    pgfAnchorEls.forEach((pgfAnchorEl) => {
      expect(pgfAnchorEl).toHaveAttribute(
        'href',
        'https://www.propertyguru.com.sg/mortgage'
      );
    });

    expect(pggAnchorEl).toHaveAttribute(
      'href',
      'https://www.propertygurugroup.com/'
    );

    expect(netflixAnchorEl).toHaveAttribute('href', 'https://www.netflix.com/');

    expect(playlistAnchorEl).toHaveAttribute(
      'href',
      'https://open.spotify.com/user/dominicarrojado/playlists'
    );

    expect(duolingoAnchorEl).toHaveAttribute(
      'href',
      'https://www.duolingo.com/profile/Dominic778651'
    );
  });

  it('should NOT display about by default', () => {
    const aboutEl = screen.queryByTestId('about');

    expect(aboutEl).toHaveClass('opacity-0');
  });

  it('should display about on window load', () => {
    act(() => {
      Window.emit('load');
    });

    const aboutEl = screen.queryByTestId('about');

    expect(aboutEl).not.toHaveClass('opacity-0');
  });
});
