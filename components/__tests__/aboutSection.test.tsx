import { render, screen, act } from '@testing-library/react';
import Window from '../../modules/Window';
import AboutSection from '../aboutSection';

describe('<AboutSection />', () => {
  beforeEach(() => {
    render(<AboutSection />);
  });

  it('should have expected anchor', () => {
    const pgfAnchorEls = screen.queryAllByText('PropertyGuru Finance');
    const pggAnchorEl = screen.queryByText('PropertyGuru Group');
    const netflixEl = screen.queryByText('Netflix');
    const playlistEl = screen.queryByText('Spotify playlists');
    const duolingoEl = screen.queryByText('Duolingo');
    const externalLinkEls = [
      ...pgfAnchorEls,
      pggAnchorEl,
      netflixEl,
      playlistEl,
      duolingoEl,
    ];

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

    expect(netflixEl).toHaveAttribute('href', 'https://www.netflix.com/');

    expect(playlistEl).toHaveAttribute(
      'href',
      'https://open.spotify.com/user/dominicarrojado/playlists'
    );

    expect(duolingoEl).toHaveAttribute('href', 'https://www.duolingo.com/');
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
