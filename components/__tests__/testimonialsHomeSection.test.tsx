import { fireEvent, render, screen } from '@testing-library/react';
import { getFakeNumber, setReadOnlyProperty } from '../../lib/test-helpers';
import { TESTIMONIALS, TESTIMONIALS_LENGTH } from '../../lib/constants';
import * as hooks from '../../lib/hooks';
import * as customHooks from '../../lib/custom-hooks';
import * as ga from '../../lib/google-analytics';
import * as TestimonialItem from '../testimonialItem';
import TestimonialsHomeSection from '../testimonialsHomeSection';

describe('<TestimonialsHomeSection />', () => {
  const renderComponent = () => {
    render(<TestimonialsHomeSection />);
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
    // mock to prevent re-render of testimonials home section
    jest.spyOn(customHooks, 'useWindowSize').mockReturnValue({
      windowWidth: 0,
      windowHeight: 0,
    });

    const testimonialItemSpy = jest.spyOn(TestimonialItem, 'default');

    renderComponent();

    TESTIMONIALS.forEach((testimonial, idx) => {
      expect(testimonialItemSpy).toHaveBeenNthCalledWith(
        idx + 1,
        { testimonial },
        {}
      );
    });
  });

  it('should display tip by default', () => {
    renderComponent();

    const tipEl = screen.queryByText('Swipe to See More');

    expect(tipEl).not.toHaveClass('opacity-0');
  });

  it('should display hand pointer tip icon on mobile/tablet', () => {
    setReadOnlyProperty(
      window,
      'innerWidth',
      getFakeNumber({ min: 1, max: 1023 })
    );

    renderComponent();

    const tipEl = screen.queryByText('Swipe to See More') as HTMLElement;
    const iconEl = tipEl.querySelector('svg');

    expect(iconEl).toHaveAttribute('viewBox', '0 0 448 512');
  });

  it('should display mouse pointer tip icon on desktop', () => {
    setReadOnlyProperty(window, 'innerWidth', getFakeNumber({ min: 1024 }));

    renderComponent();

    const tipEl = screen.queryByText('Swipe to See More') as HTMLElement;
    const iconEl = tipEl.querySelector('svg');

    expect(iconEl).toHaveAttribute('viewBox', '0 0 320 512');
  });

  describe('swipe logic', () => {
    const swipeSuccessDiff = 40;
    let windowWidth: number;
    let containerWidth: number;
    let listWidth: number;
    let listItemWidth: number;

    beforeEach(() => {
      windowWidth = getFakeNumber({ min: 1 });
      containerWidth = Math.round(getFakeNumber({ max: windowWidth }) / 2) * 2; // needs to be even because of swipeWidth can be rounded by browser
      listWidth = containerWidth * TESTIMONIALS_LENGTH;
      listItemWidth = containerWidth;

      jest.spyOn(customHooks, 'useWindowSize').mockReturnValue({
        windowWidth,
        windowHeight: getFakeNumber({ min: 1 }),
      });

      setReadOnlyProperty(window, 'innerWidth', windowWidth);

      // for setting maxSwipe on useEffect
      jest
        .spyOn(hooks, 'getRefValue')
        // containerEl
        .mockReturnValueOnce({
          offsetWidth: containerWidth,
        })
        // listEl
        .mockReturnValueOnce({
          scrollWidth: listWidth,
          firstElementChild: {
            offsetWidth: listItemWidth,
          },
        });

      renderComponent();

      const listEl = screen.queryByRole('list') as HTMLUListElement;
      const containerEl = listEl.parentElement as HTMLDivElement;

      setReadOnlyProperty(containerEl, 'offsetWidth', containerWidth);
      setReadOnlyProperty(listEl, 'scrollWidth', listWidth);
      setReadOnlyProperty(listEl, 'firstElementChild', {
        offsetWidth: listItemWidth,
      });
    });

    it('should swipe from left to right by column width', () => {
      const listEl = screen.queryByRole('list') as HTMLUListElement;
      const startX = swipeSuccessDiff + 1;
      const moveX = 0;

      // swipe to the right
      for (let idx = 1; idx < TESTIMONIALS_LENGTH; idx++) {
        fireEvent.touchStart(listEl, {
          changedTouches: [{ clientX: startX }],
        });
        fireEvent.touchMove(listEl, {
          changedTouches: [{ clientX: moveX }],
        });
        fireEvent.touchEnd(listEl);

        expect(listEl).toHaveStyle({
          transform: `translate3d(${listItemWidth * idx * -1}px, 0, 0)`,
        });
      }

      // swipe to the left
      for (let idx = TESTIMONIALS_LENGTH - 2; idx >= 0; idx--) {
        fireEvent.touchStart(listEl, {
          changedTouches: [{ clientX: -startX }],
        });
        fireEvent.touchMove(listEl, {
          changedTouches: [{ clientX: moveX }],
        });
        fireEvent.touchEnd(listEl);

        expect(listEl).toHaveStyle({
          transform: `translate3d(${listItemWidth * idx * -1}px, 0, 0)`,
        });
      }
    });

    it('should limit swipe on the right', () => {
      const listEl = screen.queryByRole('list') as HTMLUListElement;

      const startX = listWidth;
      const moveX = 0;
      const offsetXMin = 0 - listWidth - containerWidth * -1;

      fireEvent.touchStart(listEl, {
        changedTouches: [{ clientX: startX }],
      });
      fireEvent.touchMove(listEl, {
        changedTouches: [{ clientX: moveX }],
      });
      fireEvent.touchEnd(listEl);

      expect(listEl).toHaveStyle({
        transform: `translate3d(${offsetXMin}px, 0, 0)`,
      });
    });

    it('should limit swipe on the left', () => {
      const listEl = screen.queryByRole('list') as HTMLUListElement;

      const startX = -1;
      const moveX = 0;
      const offsetXMax = 0;

      fireEvent.touchStart(listEl, {
        changedTouches: [{ clientX: startX }],
      });
      fireEvent.touchMove(listEl, {
        changedTouches: [{ clientX: moveX }],
      });
      fireEvent.touchEnd(listEl);

      expect(listEl).toHaveStyle({
        transform: `translate3d(${offsetXMax}px, 0, 0)`,
      });
    });

    it('should hide tip on swipe', () => {
      const listEl = screen.queryByRole('list') as HTMLUListElement;
      const tipEl = screen.queryByText('Swipe to See More');

      const startX = 41;
      const moveX = 0;

      fireEvent.touchStart(listEl, {
        changedTouches: [{ clientX: startX }],
      });
      fireEvent.touchMove(listEl, {
        changedTouches: [{ clientX: moveX }],
      });
      fireEvent.touchEnd(listEl);

      expect(tipEl).toHaveClass('opacity-0');
    });

    it('should track swipe', () => {
      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const listEl = screen.queryByRole('list') as HTMLUListElement;

      let startX = 39;
      const moveX = 0;

      fireEvent.touchStart(listEl, {
        changedTouches: [{ clientX: startX }],
      });
      fireEvent.touchMove(listEl, {
        changedTouches: [{ clientX: moveX }],
      });
      fireEvent.touchEnd(listEl);

      expect(trackEventSpy).not.toBeCalled();

      startX = 40;

      fireEvent.touchStart(listEl, {
        changedTouches: [{ clientX: startX }],
      });
      fireEvent.touchMove(listEl, {
        changedTouches: [{ clientX: moveX }],
      });
      fireEvent.touchEnd(listEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'testimonials_swipe',
      });

      // expect not to track twice
      trackEventSpy.mockClear();

      fireEvent.touchStart(listEl, {
        changedTouches: [{ clientX: startX }],
      });
      fireEvent.touchMove(listEl, {
        changedTouches: [{ clientX: moveX }],
      });
      fireEvent.touchEnd(listEl);

      expect(trackEventSpy).not.toBeCalled();
    });

    it('should display indicators', () => {
      const indicatorsEl = screen.queryByTestId('indicators');
      const indicatorsEls =
        indicatorsEl?.childNodes as NodeListOf<HTMLButtonElement>;

      expect(indicatorsEls).toHaveLength(TESTIMONIALS_LENGTH);

      indicatorsEls.forEach((indicatorEl, idx) => {
        expect(indicatorEl.tagName).toBe('BUTTON');
        expect(indicatorEl).toHaveTextContent(`Slide ${idx + 1}`);
      });
    });

    it('should swipe on indicator click', () => {
      const indicatorsEl = screen.queryByTestId('indicators') as HTMLDivElement;
      const indicatorsEls = indicatorsEl.childNodes;
      const listEl = screen.queryByRole('list') as HTMLUListElement;

      expect(indicatorsEls[0]).toHaveClass('bg-gray-400');
      expect(indicatorsEls[0]).not.toHaveClass('bg-gray-200');

      // swipe to the right
      for (let idx = 1; idx < TESTIMONIALS_LENGTH; idx++) {
        const indicatorEl = indicatorsEls[idx];

        expect(indicatorEl).toHaveClass('bg-gray-200');
        expect(indicatorEl).not.toHaveClass('bg-gray-400');

        fireEvent.click(indicatorEl);

        expect(listEl).toHaveStyle({
          transform: `translate3d(${listItemWidth * idx * -1}px, 0, 0)`,
        });
        expect(indicatorEl).toHaveClass('bg-gray-400');
        expect(indicatorEl).not.toHaveClass('bg-gray-200');
      }

      // swipe to the left
      for (let idx = TESTIMONIALS_LENGTH - 2; idx >= 0; idx--) {
        const indicatorEl = indicatorsEls[idx];

        expect(indicatorEl).toHaveClass('bg-gray-200');
        expect(indicatorEl).not.toHaveClass('bg-gray-400');

        fireEvent.click(indicatorEl);

        expect(listEl).toHaveStyle({
          transform: `translate3d(${listItemWidth * idx * -1}px, 0, 0)`,
        });
        expect(indicatorEl).toHaveClass('bg-gray-400');
        expect(indicatorEl).not.toHaveClass('bg-gray-200');
      }
    });
  });
});
