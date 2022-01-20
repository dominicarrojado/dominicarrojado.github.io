import { render, screen } from '@testing-library/react';
import PrivacyPolicySection from '../privacyPolicySection';

describe('<PrivacyPolicySection />', () => {
  beforeEach(() => {
    render(<PrivacyPolicySection />);
  });

  test('should have expected anchors', () => {
    const privacyEmail = 'privacy@dominicarrojado.com';
    const homeAnchorEl = screen.queryByText('dominicarrojado.com');
    const projectsAnchorEls = screen.queryAllByText('Projects');
    const privacyEmailAnchorEl = screen.queryByText(privacyEmail);
    const internalLinkEls = [
      homeAnchorEl,
      ...projectsAnchorEls,
      privacyEmailAnchorEl,
    ];

    const githubPagesAnchorEl = screen.queryAllByText('GitHub Pages')[1];
    const githubAnchorEl = screen.queryByText('GitHub');
    const githubPagesPolicyAnchorEl = screen.queryAllByText('here')[0];
    const meteorAnchorEl = screen.queryByText('Meteor');
    const meteorCloudAnchorEl = screen.queryAllByText('Meteor Cloud')[1];
    const meteorCloudPolicyAnchorEl = screen.queryAllByText('here')[1];
    const googleAnchorEls = screen.queryAllByText('Google');
    const googleAnalyticsAnchorEl =
      screen.queryAllByText('Google Analytics')[1];
    const googleAnalyticsPolicyAnchorEl = screen.queryAllByText('here')[2];
    const googleAdsenseAnchorEl = screen.queryByText('Google AdSense Program');
    const googleAdsensePolicyAnchorEl = screen.queryAllByText('here')[3];
    const googleTagManagerAnchorEl =
      screen.queryAllByText('Google Tag Manager')[1];
    const googleTagManagerPolicyAnchorEl = screen.queryAllByText('here')[4];
    const microsoftClarityAnchorEl = screen.queryByText('Clarity');
    const microsoftAnchorEl = screen.queryByText('Microsoft');
    const microsoftClarityPolicyAnchorEl = screen.queryAllByText('here')[5];
    const cookiesAnchorEl = screen.queryAllByText('here')[6];
    const externalLinkEls = [
      githubPagesAnchorEl,
      githubAnchorEl,
      githubPagesPolicyAnchorEl,
      meteorAnchorEl,
      meteorCloudAnchorEl,
      meteorCloudPolicyAnchorEl,
      ...googleAnchorEls,
      googleAnalyticsAnchorEl,
      googleAnalyticsPolicyAnchorEl,
      googleAdsenseAnchorEl,
      googleAdsensePolicyAnchorEl,
      googleTagManagerAnchorEl,
      googleTagManagerPolicyAnchorEl,
      cookiesAnchorEl,
    ];

    internalLinkEls.forEach((internalLinkEl) => {
      expect(internalLinkEl?.tagName).toBe('A');
      expect(internalLinkEl).not.toHaveAttribute('target');
      expect(internalLinkEl).not.toHaveAttribute('rel');
    });

    expect(homeAnchorEl).toHaveAttribute('href', '/');

    expect(projectsAnchorEls.length).toBe(2);
    projectsAnchorEls.forEach((projectsAnchorEl) => {
      expect(projectsAnchorEl).toHaveAttribute('href', '/projects');
    });

    expect(privacyEmailAnchorEl).toHaveAttribute(
      'href',
      `mailto:${privacyEmail}`
    );

    externalLinkEls.forEach((externalLinkEl) => {
      expect(externalLinkEl?.tagName).toBe('A');
      expect(externalLinkEl).toHaveAttribute('target', '_blank');
      expect(externalLinkEl).toHaveAttribute(
        'rel',
        'noopener noreferrer nofollow'
      );
    });

    expect(githubPagesAnchorEl).toHaveAttribute(
      'href',
      'https://pages.github.com/'
    );

    expect(githubAnchorEl).toHaveAttribute('href', 'https://github.com/');

    expect(githubPagesPolicyAnchorEl).toHaveAttribute(
      'href',
      'https://docs.github.com/en/github/site-policy/github-privacy-statement#github-pages'
    );

    expect(meteorAnchorEl).toHaveAttribute('href', 'https://www.meteor.com/');

    expect(meteorCloudAnchorEl).toHaveAttribute(
      'href',
      'https://www.meteor.com/cloud'
    );

    expect(meteorCloudPolicyAnchorEl).toHaveAttribute(
      'href',
      'https://cloud-guide.meteor.com/security.html'
    );

    expect(googleAnchorEls.length).toBe(3);
    googleAnchorEls.forEach((googleAnchorEl) => {
      expect(googleAnchorEl).toHaveAttribute('href', 'https://www.google.com/');
    });

    expect(googleAnalyticsAnchorEl).toHaveAttribute(
      'href',
      'https://analytics.google.com/'
    );

    expect(googleAnalyticsPolicyAnchorEl).toHaveAttribute(
      'href',
      'https://support.google.com/analytics/answer/6004245'
    );

    expect(googleAdsenseAnchorEl).toHaveAttribute(
      'href',
      'https://www.google.com/adsense/start/'
    );

    expect(googleAdsensePolicyAnchorEl).toHaveAttribute(
      'href',
      'https://support.google.com/adsense/answer/48182'
    );

    expect(googleTagManagerAnchorEl).toHaveAttribute(
      'href',
      'https://tagmanager.google.com/'
    );

    expect(googleTagManagerPolicyAnchorEl).toHaveAttribute(
      'href',
      'https://support.google.com/tagmanager/answer/9323295'
    );

    expect(microsoftClarityAnchorEl).toHaveAttribute(
      'href',
      'https://clarity.microsoft.com/'
    );

    expect(microsoftAnchorEl).toHaveAttribute(
      'href',
      'https://www.microsoft.com/'
    );

    expect(microsoftClarityPolicyAnchorEl).toHaveAttribute(
      'href',
      'https://docs.microsoft.com/en-us/clarity/faq#privacy'
    );

    expect(cookiesAnchorEl).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/HTTP_cookie'
    );
  });

  test('should have expected updated date', () => {
    const dateEl = screen.queryByText(
      'This document was last updated on January 21, 2022'
    );

    expect(dateEl).toBeInTheDocument();
  });
});
