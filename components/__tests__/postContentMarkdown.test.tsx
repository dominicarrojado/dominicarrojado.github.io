import { render, screen } from '@testing-library/react';
import {
  getFakeDirectoryPath,
  getFakeSentence,
  getFakeUrl,
  getRandomRouteExceptHome,
} from '../../lib/test-helpers';
import {
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  GoogleAdSenseUnitLayout,
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
    it('should render image', () => {
      const imgSrc = getFakeUrl();
      const imgAlt = getFakeSentence();

      renderComponent({ content: `![${imgAlt}](${imgSrc})` });

      const imgEl = screen.queryByAltText(imgAlt);

      expect(imgEl?.tagName).toBe('IMG');
      expect(imgEl).toHaveAttribute('loading', 'lazy');
    });

    it('should NOT be a descendant of <p>', () => {
      const imgSrc = getFakeUrl();
      const imgAlt = getFakeSentence();

      renderComponent({ content: `![${imgAlt}](${imgSrc})` });

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
