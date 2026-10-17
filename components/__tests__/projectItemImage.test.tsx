import { render, screen } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import ProjectItemImage from '../projectItemImage';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<ProjectItemImage />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should serve webp source with png fallback and async decoding', () => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(false);

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
