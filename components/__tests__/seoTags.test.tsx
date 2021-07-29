import { render } from '@testing-library/react';
import * as Head from 'next/head';
import {
  getFakeDirectoryPath,
  getFakeImageUrl,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
} from '../../lib/test-helpers';
import { MAIN_TITLE, MAIN_URL } from '../../lib/constants';
import SeoTags from '../seoTags';

describe('<SeoTags />', () => {
  beforeEach(() => {
    jest
      .spyOn(Head, 'default')
      .mockImplementation(({ children }) => <>{children}</>);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('path is index', () => {
    const path = '/';
    const title = getFakeSentence();
    const desc = getFakeSentences();
    const imageUrl = getFakeImageUrl();
    const imageWidth = getFakeNumber();
    const imageHeight = getFakeNumber();

    beforeEach(() => {
      render(
        <SeoTags
          path={path}
          title={title}
          description={desc}
          imageUrl={imageUrl}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      );
    });

    it('should render url tags', () => {
      const linkCanonical = document.querySelector('link[rel="canonical"]');
      const metaOgUrl = document.querySelector('meta[property="og:url"]');

      expect(linkCanonical).toHaveAttribute('href', MAIN_URL);
      expect(metaOgUrl).toHaveAttribute('content', MAIN_URL);
    });

    it('should render title tags', () => {
      const metaOgTitle = document.querySelector('meta[property="og:title"]');
      const metaSiteName = document.querySelector(
        'meta[property="og:site_name"]'
      );
      const metaTwitterTitle = document.querySelector(
        'meta[name="twitter:title"]'
      );
      const titleEl = document.querySelector('title');

      expect(metaOgTitle).toHaveAttribute('content', title);
      expect(metaSiteName).toHaveAttribute('content', title);
      expect(metaTwitterTitle).toHaveAttribute('content', title);
      expect(titleEl).toHaveTextContent(title);
    });

    it('should render description tags', () => {
      const metaDesc = document.querySelector('meta[name="description"]');
      const metaOgDesc = document.querySelector(
        'meta[property="og:description"]'
      );
      const metaTwitterDesc = document.querySelector(
        'meta[name="twitter:description"]'
      );

      expect(metaDesc).toHaveAttribute('content', desc);
      expect(metaOgDesc).toHaveAttribute('content', desc);
      expect(metaTwitterDesc).toHaveAttribute('content', desc);
    });

    it('should render image url tags', () => {
      const metaOgImg = document.querySelector('meta[property="og:image"]');
      const metaOgSecureImg = document.querySelector(
        'meta[property="og:image:secure_url"]'
      );
      const metaTwitterImg = document.querySelector(
        'meta[name="twitter:image"]'
      );

      expect(metaOgImg).toHaveAttribute('content', imageUrl);
      expect(metaOgSecureImg).toHaveAttribute('content', imageUrl);
      expect(metaTwitterImg).toHaveAttribute('content', imageUrl);
    });

    it('should render image width tags', () => {
      const metaOgImgWidth = document.querySelector(
        'meta[property="og:image:width"]'
      );

      expect(metaOgImgWidth).toHaveAttribute('content', imageWidth.toString());
    });

    it('should render image height tags', () => {
      const metaOgImgHeight = document.querySelector(
        'meta[property="og:image:height"]'
      );

      expect(metaOgImgHeight).toHaveAttribute(
        'content',
        imageHeight.toString()
      );
    });
  });

  describe('path is NOT index', () => {
    const path = getFakeDirectoryPath();
    const title = getFakeSentence();
    const desc = getFakeSentences();
    const imageUrl = getFakeImageUrl();
    const imageWidth = getFakeNumber();
    const imageHeight = getFakeNumber();

    beforeEach(() => {
      render(
        <SeoTags
          path={path}
          title={title}
          description={desc}
          imageUrl={imageUrl}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
        />
      );
    });

    it('should render url tags', () => {
      const linkCanonical = document.querySelector('link[rel="canonical"]');
      const metaOgUrl = document.querySelector('meta[property="og:url"]');
      const expectedContent = `${MAIN_URL}${path}`;

      expect(linkCanonical).toHaveAttribute('href', expectedContent);
      expect(metaOgUrl).toHaveAttribute('content', expectedContent);
    });

    it('should render title tags', () => {
      const metaOgTitle = document.querySelector('meta[property="og:title"]');
      const metaSiteName = document.querySelector(
        'meta[property="og:site_name"]'
      );
      const metaTwitterTitle = document.querySelector(
        'meta[name="twitter:title"]'
      );
      const titleEl = document.querySelector('title');
      const expectedTitle = `${title} - ${MAIN_TITLE}`;

      expect(metaOgTitle).toHaveAttribute('content', expectedTitle);
      expect(metaSiteName).toHaveAttribute('content', expectedTitle);
      expect(metaTwitterTitle).toHaveAttribute('content', expectedTitle);
      expect(titleEl).toHaveTextContent(expectedTitle);
    });

    it('should render description tags', () => {
      const metaDesc = document.querySelector('meta[name="description"]');
      const metaOgDesc = document.querySelector(
        'meta[property="og:description"]'
      );
      const metaTwitterDesc = document.querySelector(
        'meta[name="twitter:description"]'
      );

      expect(metaDesc).toHaveAttribute('content', desc);
      expect(metaOgDesc).toHaveAttribute('content', desc);
      expect(metaTwitterDesc).toHaveAttribute('content', desc);
    });

    it('should render image url tags', () => {
      const metaOgImg = document.querySelector('meta[property="og:image"]');
      const metaOgSecureImg = document.querySelector(
        'meta[property="og:image:secure_url"]'
      );
      const metaTwitterImg = document.querySelector(
        'meta[name="twitter:image"]'
      );

      expect(metaOgImg).toHaveAttribute('content', imageUrl);
      expect(metaOgSecureImg).toHaveAttribute('content', imageUrl);
      expect(metaTwitterImg).toHaveAttribute('content', imageUrl);
    });

    it('should render image width tags', () => {
      const metaOgImgWidth = document.querySelector(
        'meta[property="og:image:width"]'
      );

      expect(metaOgImgWidth).toHaveAttribute('content', imageWidth.toString());
    });

    it('should render image height tags', () => {
      const metaOgImgHeight = document.querySelector(
        'meta[property="og:image:height"]'
      );

      expect(metaOgImgHeight).toHaveAttribute(
        'content',
        imageHeight.toString()
      );
    });
  });
});
