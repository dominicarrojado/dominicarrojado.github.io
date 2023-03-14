import {
  getFakeDomainWord,
  getFakeSentence,
  getFakeUrl,
  getFakeWord,
  setReadOnlyProperty,
} from '../test-helpers';
import { GoogleAnalyticsEvent, SocialName } from '../types';
import { trackEvent } from '../google-analytics';

describe('google-analytics utilities', () => {
  describe('trackEvent()', () => {
    const dataLayerOrig = window.dataLayer;
    const locationOrig = window.location;

    beforeEach(() => {
      delete (window as any).dataLayer;
      delete (window as any).location;
    });

    afterEach(() => {
      window.dataLayer = dataLayerOrig;
      setReadOnlyProperty(window, 'location', locationOrig);
    });

    it('should NOT track event on local development', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: 'localhost',
      });

      const event = {
        event: GoogleAnalyticsEvent.SCROLL_CLICK,
        linkText: getFakeSentence(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toBeUndefined();
    });

    it('should track event if dataLayer is NOT defined yet', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const event = {
        event: GoogleAnalyticsEvent.SOCIAL_CLICK,
        socialName: SocialName.EMAIL,
        linkUrl: getFakeUrl(),
        linkText: getFakeSentence(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toEqual([event]);
    });

    it('should track event if dataLayer is defined', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const currentDataLayer = [
        {
          event: GoogleAnalyticsEvent.PROJECT_CLICK,
          projectTitle: getFakeSentence(),
          linkText: getFakeSentence(),
          linkUrl: getFakeUrl(),
        },
      ];

      window.dataLayer = [...currentDataLayer];

      const event = {
        event: GoogleAnalyticsEvent.PROJECT_CLICK,
        projectTitle: getFakeSentence(),
        linkText: getFakeSentence(),
        linkUrl: getFakeUrl(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toEqual([...currentDataLayer, event]);
    });
  });
});
