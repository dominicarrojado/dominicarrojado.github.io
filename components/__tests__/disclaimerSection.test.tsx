import { render, screen } from '@testing-library/react';
import DisclaimerSection from '../disclaimerSection';

describe('<DisclaimerSection />', () => {
  beforeEach(() => {
    render(<DisclaimerSection />);
  });

  test('should have expected anchors', () => {
    const disclaimerEmail = 'disclaimer@dominicarrojado.com';
    const projectsAnchorEl = screen.queryByText('Projects');
    const emailAnchorEl = screen.queryByText(disclaimerEmail);
    const internalLinkEls = [projectsAnchorEl, emailAnchorEl];
    const faAnchorEl = screen.queryAllByText('Font Awesome')[1];
    const faLicenseAnchorEl = screen.queryByText('here');
    const externalLinkEls = [faAnchorEl, faLicenseAnchorEl];

    internalLinkEls.forEach((internalLink) => {
      expect(internalLink?.tagName).toBe('A');
      expect(internalLink).not.toHaveAttribute('target');
      expect(internalLink).not.toHaveAttribute('rel');
    });

    expect(projectsAnchorEl).toHaveAttribute('href', '/projects');

    expect(emailAnchorEl).toHaveAttribute('href', `mailto:${disclaimerEmail}`);

    externalLinkEls.forEach((externalLinkEl) => {
      expect(externalLinkEl?.tagName).toBe('A');
      expect(externalLinkEl).toHaveAttribute('target', '_blank');
      expect(externalLinkEl).toHaveAttribute(
        'rel',
        'noopener noreferrer nofollow'
      );
    });

    expect(faAnchorEl).toHaveAttribute('href', 'https://fontawesome.com/');

    expect(faLicenseAnchorEl).toHaveAttribute(
      'href',
      'https://fontawesome.com/license/free'
    );
  });
});
