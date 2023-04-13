import { getFakeSentence } from '../test-helpers';
import * as locationHelpers from '../location';
import { displayAd } from '../google-adsense';

jest.mock('../location', () => ({
  __esModule: true,
  ...jest.requireActual('../location'),
}));

describe('google-adsense utilities', () => {
  describe('displayAd()', () => {
    const adsByGoogleOrig = window.adsbygoogle;

    beforeEach(() => {
      jest.spyOn(locationHelpers, 'checkIsLocalhost').mockReturnValue(false);

      delete (window as any).googleads;
    });

    afterEach(() => {
      jest.restoreAllMocks();

      window.adsbygoogle = adsByGoogleOrig;
    });

    it('should NOT track event on local development', () => {
      jest.spyOn(locationHelpers, 'checkIsLocalhost').mockReturnValue(true);

      displayAd();

      expect(window.adsbygoogle).toBeUndefined();
    });

    it('should track event if adsbygoogle is NOT defined yet', () => {
      displayAd();

      expect(window.adsbygoogle).toEqual([{}]);
    });

    it('should track event if adsbygoogle is defined', () => {
      const currentAdsByGoogle = [{}];

      window.adsbygoogle = [...currentAdsByGoogle];

      displayAd();

      expect(window.adsbygoogle).toEqual([...currentAdsByGoogle, {}]);
    });

    it('should handle unexpected error', () => {
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation();
      const unexpectedError = getFakeSentence();

      window.adsbygoogle = [{}];
      window.adsbygoogle.push = jest.fn().mockImplementation(() => {
        throw unexpectedError;
      });

      displayAd();

      expect(consoleErrorMock).toBeCalledTimes(1);
      expect(consoleErrorMock).toBeCalledWith(
        'Error on displaying Google AdSense unit',
        unexpectedError
      );
    });
  });
});
