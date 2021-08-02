import { AxiosResponse } from 'axios';
import { getImageDataFromResponse } from '../axios';

describe('axios utilities', () => {
  describe('getImageDataFromResponse()', () => {
    it('can get image data from response', () => {
      const contentType = 'image/gif;charset=utf-8';

      expect(
        getImageDataFromResponse({
          data: 'ArrayBuffer',
          headers: {
            'content-type': contentType,
          },
        } as AxiosResponse)
      ).toContain(`data:${contentType}`);
    });
  });
});
