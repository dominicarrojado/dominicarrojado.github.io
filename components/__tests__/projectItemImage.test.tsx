import { render, screen } from '@testing-library/react';
import ProjectItemImage from '../projectItemImage';

describe('<ProjectItemImage />', () => {
  it('should serve webp source with png fallback and async decoding', () => {
    const { container } = render(
      <ProjectItemImage
        imageUrl="/images/projects/sample.png"
        imageWidth={100}
        imageHeight={50}
        gifUrl="/images/projects/sample.gif"
        title="Sample"
      />
    );

    const sourceEl = container.querySelector('picture source');
    const imgEl = screen.getByAltText('Screenshot of Sample');

    expect(sourceEl).toHaveAttribute('srcset', '/images/projects/sample.webp');
    expect(sourceEl).toHaveAttribute('type', 'image/webp');
    expect(imgEl).toHaveAttribute('src', '/images/projects/sample.png');
    expect(imgEl).toHaveAttribute('decoding', 'async');
  });
});
