import { getFakeDomainWord, setReadOnlyProperty } from '../test-helpers';
import { displayAd } from '../google-adsense';

describe('google-adsense utilities', () => {
  describe('displayAd()', () => {
    const adsByGoogleOrig = window.adsbygoogle;
    const locationOrig = window.location;

    beforeEach(() => {
      delete (window as any).googleads;
      delete (window as any).location;
    });

    afterEach(() => {
      window.adsbygoogle = adsByGoogleOrig;
      setReadOnlyProperty(window, 'location', locationOrig);
    });

    it('should NOT track event on local development', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: 'localhost',
      });

      displayAd();

      expect(window.adsbygoogle).toBeUndefined();
    });

    it('should track event if adsbygoogle is NOT defined yet', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      displayAd();

      expect(window.adsbygoogle).toEqual([{}]);
    });

    it('should track event if adsbygoogle is defined', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const currentAdsByGoogle = [{}];

      window.adsbygoogle = [...currentAdsByGoogle];

      displayAd();

      expect(window.adsbygoogle).toEqual([...currentAdsByGoogle, {}]);
    });
  });
});
