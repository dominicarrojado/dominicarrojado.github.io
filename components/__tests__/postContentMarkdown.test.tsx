import { render, screen } from '@testing-library/react';
import { forceVisible } from 'react-lazyload';
import {
  getFakeDirectoryPath,
  getFakeSentence,
  getFakeUrl,
  getRandomRoute,
} from '../../lib/test-helpers';
import {
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  GoogleAdSenseUnitLayout,
  Route,
} from '../../lib/types';
import PostContentMarkdown, { Props } from '../postContentMarkdown';

describe('<PostContentMarkdown />', () => {
  const renderComponent = (props: Props) => {
    return render(<PostContentMarkdown {...props} />);
  };

  describe('anchor elements', () => {
    it('should render home link', () => {
      const anchorText = getFakeSentence();
      const anchorHref = '/';
      renderComponent({ content: `[${anchorText}](${anchorHref})` });

      const anchorEl = screen.queryByText(anchorText);

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', anchorHref);
      expect(anchorEl).not.toHaveAttribute('target');
      expect(anchorEl).not.toHaveAttribute('rel');
    });

    it('should render internal link', () => {
      const getRandomRouteExceptHome = (): Route => {
        const route = getRandomRoute();

        if (route === Route.HOME) {
          return getRandomRouteExceptHome();
        }

        return route;
      };
      const anchorText = getFakeSentence();
      const anchorHref = `${getRandomRouteExceptHome()}${getFakeDirectoryPath()}`;

      renderComponent({ content: `[${anchorText}](${anchorHref})` });

      const anchorEl = screen.queryByText(anchorText);

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', anchorHref);
      expect(anchorEl).not.toHaveAttribute('target');
      expect(anchorEl).not.toHaveAttribute('rel');
    });

    it('should render project link', () => {
      const anchorText = getFakeSentence();
      const anchorHref = getFakeDirectoryPath();

      renderComponent({ content: `[${anchorText}](${anchorHref})` });

      const anchorEl = screen.queryByText(anchorText);

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', anchorHref);
      expect(anchorEl).toHaveAttribute('target', '_blank');
      expect(anchorEl).not.toHaveAttribute('rel');
    });

    it('should render external link', () => {
      const anchorText = getFakeSentence();
      const anchorHref = getFakeUrl();

      renderComponent({ content: `[${anchorText}](${anchorHref})` });

      const anchorEl = screen.queryByText(anchorText);

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', anchorHref);
      expect(anchorEl).toHaveAttribute('target', '_blank');
      expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
    });
  });

  describe('image elements', () => {
    it('should NOT render image by default', () => {
      const imgSrc = getFakeUrl();
      const imgAlt = getFakeSentence();

      renderComponent({ content: `![${imgAlt}](${imgSrc})` });

      const imgEl = screen.queryByAltText(imgAlt);

      expect(imgEl).not.toBeInTheDocument();
    });

    it('should render image on lazy load', () => {
      const imgSrc = getFakeUrl();
      const imgAlt = getFakeSentence();

      renderComponent({ content: `![${imgAlt}](${imgSrc})` });

      forceVisible();

      const imgEl = screen.queryByAltText(imgAlt);

      expect(imgEl?.tagName).toBe('IMG');
    });

    it('should NOT be a descendant of <p>', () => {
      const imgSrc = getFakeUrl();
      const imgAlt = getFakeSentence();

      renderComponent({ content: `![${imgAlt}](${imgSrc})` });

      forceVisible();

      const imgEl = screen.queryByAltText(imgAlt);

      expect(imgEl?.closest('p')).toBeNull();
    });
  });

  describe('horizontal rule elements', () => {
    it('should render expected ad unit', () => {
      renderComponent({ content: '---' });

      const adUnitEl = screen.queryByTestId('ad-unit');
      const headingEl = screen.queryByRole('heading');

      expect(adUnitEl).toHaveAttribute(
        'data-ad-slot',
        GoogleAdSenseUnit.POST_BODY
      );
      expect(adUnitEl).toHaveAttribute(
        'data-ad-format',
        GoogleAdSenseUnitFormat.FLUID
      );
      expect(adUnitEl).toHaveAttribute(
        'data-ad-layout',
        GoogleAdSenseUnitLayout.IN_ARTICLE
      );

      expect(headingEl).not.toBeInTheDocument();
    });
  });
});
