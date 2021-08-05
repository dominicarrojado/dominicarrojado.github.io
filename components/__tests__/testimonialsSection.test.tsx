import { fireEvent, render, screen } from '@testing-library/react';
import {
  getFakeCompanyName,
  getFakeJobTitle,
  getFakeName,
  getFakeNumber,
  getFakeSentences,
  setReadOnlyProperty,
} from '../../lib/test-helpers';
import * as customHooks from '../../lib/custom-hooks';
import * as ga from '../../lib/google-analytics';
import * as TestimonialItem from '../testimonialItem';
import { Testimonial } from '../../lib/types';
import TestimonialsSection from '../testimonialsSection';

describe('<TestimonialsSection />', () => {
  const testimonials = [
    {
      order: getFakeNumber(),
      name: getFakeName(),
      jobTitle: getFakeJobTitle(),
      companyName: getFakeCompanyName(),
      contentHtml: `<p>${getFakeSentences()}</p>`,
    },
    {
      order: getFakeNumber(),
      name: getFakeName(),
      jobTitle: getFakeJobTitle(),
      companyName: getFakeCompanyName(),
      contentHtml: `<p>${getFakeSentences()}</p>`,
    },
  ] as Array<Testimonial>;
  const testimonialsLen = testimonials.length;
  const renderComponent = () => {
    render(<TestimonialsSection testimonials={testimonials} />);
  };
  const windowWidthOrig = window.innerWidth;

  afterEach(() => {
    jest.restoreAllMocks();

    setReadOnlyProperty(window, 'innerWidth', windowWidthOrig);
  });

  it('should have expected title', () => {
    renderComponent();

    const titleEl = screen.queryByText('Testimonials');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    renderComponent();

    const content =
      "Kind words from people I've worked with and currently working with.";

    expect(screen.queryByText(content)).toBeInTheDocument();
  });

  it('should display testimonials', () => {
    // mock to prevent re-render of testimonials section
    jest.spyOn(customHooks, 'useWindowSize').mockReturnValue({
      windowWidth: 0,
      windowHeight: 0,
      windowWidthRef: { current: 0 },
      windowHeightRef: { current: 0 },
    });

    const testimonialItemSpy = jest.spyOn(TestimonialItem, 'default');

    renderComponent();

    testimonials.forEach((testimonial, idx) => {
      expect(testimonialItemSpy).toHaveBeenNthCalledWith(
        idx + 1,
        { testimonial },
        {}
      );
    });
  });

  it('should display tip', () => {
    renderComponent();

    const tipEl = screen.queryByText('Swipe to See More');

    expect(tipEl).not.toHaveClass('opacity-0');
  });

  it('should have expected container width on extra-small breakpoint', () => {
    const windowWidth = 474;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container');

    expect(containerEl).toHaveStyle({
      width: `${windowWidth * testimonialsLen}px`,
    });
  });

  it('should have expected container width on small breakpoint', () => {
    const windowWidth = 639;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container');

    expect(containerEl).toHaveStyle({
      width: `${windowWidth * 0.9 * testimonialsLen}px`,
    });
  });

  it('should have expected container width on medium breakpoint', () => {
    const windowWidth = 1023;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container');

    expect(containerEl).toHaveStyle({
      width: `${windowWidth * 0.85 * testimonialsLen}px`,
    });
  });

  it('should have expected container width on large breakpoint', () => {
    const windowWidth = 1279;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container');

    expect(containerEl).toHaveStyle({
      width: `${(windowWidth / 2) * testimonialsLen}px`,
    });
  });

  it('should have expected container width on extra large breakpoint', () => {
    const windowWidth = 1281;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container');

    expect(containerEl).toHaveStyle({
      width: `${(windowWidth / 3) * testimonialsLen}px`,
    });
  });

  it('should allow swiping', () => {
    const windowWidth = 474;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container') as HTMLDivElement;
    const startX = 10;
    const moveX = 0;
    const offsetX = 0 - startX - moveX;

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(containerEl).toHaveStyle({
      transform: `translateX(${offsetX}px)`,
    });
  });

  it('should limit swipe on the right', () => {
    const windowWidth = 474;
    const containerWidth = windowWidth * testimonialsLen;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container') as HTMLDivElement;
    const startX = containerWidth;
    const moveX = 0;
    const offsetX = 0 - containerWidth - windowWidth * -1;

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(containerEl).toHaveStyle({
      transform: `translateX(${offsetX}px)`,
    });
  });

  it('should limit swipe on the left', () => {
    const windowWidth = 474;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container') as HTMLDivElement;
    const startX = -100;
    const moveX = 0;
    const offsetX = 0;

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(containerEl).toHaveStyle({
      transform: `translateX(${offsetX}px)`,
    });
  });

  it('should hide tip on swipe', () => {
    const windowWidth = 474;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container') as HTMLDivElement;
    const startX = 41;
    const moveX = 0;
    const offsetX = 0 - startX - moveX;

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(containerEl).toHaveStyle({
      transform: `translateX(${offsetX}px)`,
    });

    const tipEl = screen.queryByText('Swipe to See More');

    expect(tipEl).toHaveClass('opacity-0');
  });

  it('should track swipe', () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    const windowWidth = 474;

    setReadOnlyProperty(window, 'innerWidth', windowWidth);

    renderComponent();

    const containerEl = screen.queryByTestId('container') as HTMLDivElement;
    let startX = 39;
    let moveX = 0;
    let offsetX = 0 - startX - moveX;

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(containerEl).toHaveStyle({
      transform: `translateX(${offsetX}px)`,
    });

    expect(trackEventSpy).not.toBeCalled();

    startX = 41;
    offsetX = 0 - startX - moveX;

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'testimonials_swipe',
    });

    // expect not to track twice
    trackEventSpy.mockClear();

    fireEvent.touchStart(containerEl, {
      changedTouches: [{ clientX: startX }],
    });
    fireEvent.touchMove(containerEl, {
      changedTouches: [{ clientX: moveX }],
    });
    fireEvent.touchEnd(containerEl);

    expect(trackEventSpy).not.toBeCalled();
  });
});
