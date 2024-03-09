import { render, screen } from '@testing-library/react';
import DonateSection from '../donateSection';

describe('<DonateSection />', () => {
  beforeEach(() => {
    render(<DonateSection />);
  });

  it('should have expected images', () => {
    const payLahImageEl = screen.queryByAltText('DBS PayLah! QR code');

    expect(payLahImageEl).toHaveAttribute('src', '/images/donate/paylah.jpg');
    expect(payLahImageEl).toHaveAttribute('width', '540');
    expect(payLahImageEl).toHaveAttribute('height', '540');

    const paypalImageEl = screen.queryByAltText('PayPal');

    expect(paypalImageEl).toHaveAttribute('src', '/images/donate/paypal.svg');

    expect(paypalImageEl).toHaveAttribute('width', '246');
    expect(paypalImageEl).toHaveAttribute('height', '60');
  });

  it('should have expected anchors', () => {
    const sgAlertsAnchorEl = screen.queryByText('SG Alerts');
    const phAlertsAnchorEl = screen.queryByText('PH Alerts');
    const paylahAnchorEl = screen.queryByText('DBS PayLah!');
    const paypalAnchorEl = screen.queryByTitle('Personal PayPal');
    const projectLinkEls = [sgAlertsAnchorEl, phAlertsAnchorEl];
    const externalLinkEls = [paylahAnchorEl, paypalAnchorEl];

    projectLinkEls.forEach((projectLinkEl) => {
      expect(projectLinkEl?.tagName).toBe('A');
      expect(projectLinkEl).toHaveAttribute('target', '_blank');
      expect(projectLinkEl).not.toHaveAttribute('rel');
    });

    externalLinkEls.forEach((externalLinkEl) => {
      expect(externalLinkEl?.tagName).toBe('A');
      expect(externalLinkEl).toHaveAttribute(
        'rel',
        'noopener noreferrer nofollow'
      );
      expect(externalLinkEl).toHaveAttribute('target', '_blank');
    });

    expect(sgAlertsAnchorEl).toHaveAttribute('href', '/sg-alerts/');

    expect(phAlertsAnchorEl).toHaveAttribute('href', '/ph-alerts/');

    expect(paylahAnchorEl).toHaveAttribute(
      'href',
      'https://www.dbs.com.sg/personal/deposits/pay-with-ease/dbs-paylah'
    );

    expect(paypalAnchorEl).toHaveAttribute(
      'href',
      'https://www.paypal.com/paypalme/DominicArrojado'
    );
  });
});
