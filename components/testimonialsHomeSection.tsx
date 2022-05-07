import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Button } from 'reakit/Button';
import { VisuallyHidden } from 'reakit/VisuallyHidden';
import { useWindowSize } from '../lib/custom-hooks';
import { getRefValue, useStateRef } from '../lib/hooks';
import { getTouchEventData } from '../lib/dom';
import { trackEvent } from '../lib/google-analytics';
import Section from './section';
import SectionContent from './sectionContent';
import SectionTitle from './sectionTitle';
import TestimonialItem from './testimonialItem';
import SvgMousePointer from './svgMousePointer';
import SvgHandPointer from './svgHandPointer';
import { GoogleAnalyticsEvents } from '../lib/types';
import {
  SCREEN_LG,
  TESTIMONIALS,
  TESTIMONIALS_LENGTH,
  TESTIMONIALS_SUCCESS_SWIPE_DIFF,
} from '../lib/constants';

export default function TestimonialsHomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const currentOffsetXRef = useRef(0);
  const newOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const isSwipeTrackedRef = useRef(false);
  const { windowWidth } = useWindowSize();
  const [shouldDisplayTip, setShouldDisplayTip] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [maxSwipe, setMaxSwipe] = useState(0);
  const indicators = useMemo(
    () => Array.from(Array(maxSwipe).keys()),
    [maxSwipe]
  );
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const TipIcon = windowWidth < SCREEN_LG ? SvgHandPointer : SvgMousePointer;

  const getSwipeDetails = () => {
    const containerEl = getRefValue(containerRef);
    const listEl = getRefValue(listRef);
    const containerWidth = containerEl.offsetWidth;
    const containerWidthRounded = Math.round(containerWidth / 2) * 2; // needs to be even because of swipeWidth can be rounded by browser
    const listWidth = listEl.scrollWidth;
    const listItemEl = listEl.firstElementChild as HTMLLIElement;
    const swipeWidth = listItemEl.offsetWidth;
    const offsetXMin = -(listWidth - containerWidthRounded);
    const offsetXMax = 0;
    const maxSwipe =
      TESTIMONIALS_LENGTH - Math.round(containerWidth / swipeWidth) + 1;

    return {
      offsetXMin,
      offsetXMax,
      swipeWidth,
      maxSwipe,
    };
  };

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    // get swipe details
    const { offsetXMin, offsetXMax, swipeWidth, maxSwipe } = getSwipeDetails();

    // add resistance to when swiping on both ends
    if (diff !== 0 && (newOffsetX > offsetXMax || newOffsetX < offsetXMin)) {
      if (diff > 0) {
        // swipe to the right
        newOffsetX -= Math.round((newOffsetX - offsetXMin) * 0.7);
      } else {
        // swipe to the left
        newOffsetX -= Math.round((newOffsetX - offsetXMax) * 0.7);
      }
    }

    setOffsetX(newOffsetX);

    if (Math.abs(diff) >= TESTIMONIALS_SUCCESS_SWIPE_DIFF) {
      setShouldDisplayTip(false);

      if (!getRefValue(isSwipeTrackedRef)) {
        isSwipeTrackedRef.current = true;
        trackEvent({
          event: GoogleAnalyticsEvents.TESTIMONIALS_SWIPE,
        });
      }
    }

    let adjustedOffsetX = getRefValue(currentOffsetXRef);

    // adjust offset to arrange items on their respective column after touch ends
    if (Math.abs(diff) > TESTIMONIALS_SUCCESS_SWIPE_DIFF) {
      if (diff > 0) {
        // swipe to the right
        adjustedOffsetX = Math.floor(newOffsetX / swipeWidth) * swipeWidth;
      } else {
        // swipe to the left
        adjustedOffsetX = Math.ceil(newOffsetX / swipeWidth) * swipeWidth;
      }

      // limit swiping on most right or left
      adjustedOffsetX = Math.min(adjustedOffsetX, offsetXMax);
      adjustedOffsetX = Math.max(adjustedOffsetX, offsetXMin);

      let newSwipeIdx = Math.ceil(Math.abs(adjustedOffsetX / swipeWidth));
      newSwipeIdx = Math.min(newSwipeIdx, maxSwipe - 1);

      setSwipeIdx(newSwipeIdx);
    }

    newOffsetXRef.current = adjustedOffsetX;
  };
  const onTouchEnd = () => {
    setIsSwiping(false);
    setOffsetX(getRefValue(newOffsetXRef));

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mouseup', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
  };
  const onTouchStart = (
    e: React.TouchEvent<HTMLUListElement> | React.MouseEvent<HTMLUListElement>
  ) => {
    setIsSwiping(true);

    startXRef.current = getTouchEventData(e).clientX;
    currentOffsetXRef.current = getRefValue(offsetXRef);

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };
  const indicatorOnClick = (idx: number) => {
    const { swipeWidth, offsetXMin } = getSwipeDetails();
    let newOffsetX = -(swipeWidth * idx);
    newOffsetX = Math.max(newOffsetX, offsetXMin);

    setOffsetX(newOffsetX);
    setSwipeIdx(idx);
  };

  useEffect(() => {
    const { maxSwipe } = getSwipeDetails();

    // reset states on window resize
    setOffsetX(0);
    setSwipeIdx(0);
    setMaxSwipe(maxSwipe || 0);
    setShouldDisplayTip(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return (
    <Section>
      <SectionTitle>Testimonials</SectionTitle>
      <SectionContent>
        Kind words from people I've worked with and currently working with.
      </SectionContent>
      <div
        className={cn(
          'relative -mx-6 overflow-hidden',
          'sm:-mx-8',
          'lg:-mx-10'
        )}
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={containerRef} className="relative pb-10">
          <ul
            ref={listRef}
            className={cn(
              'relative mt-8 flex flex-row items-center cursor-grab active:cursor-grabbing select-none',
              'transform transition-transform ease-out',
              'motion-reduce:transition-none',
              'sm:mt-10',
              'lg:mt-12',
              {
                [!isSwiping ? 'duration-300' : 'duration-0']: true,
              }
            )}
            style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
            onTouchStart={onTouchStart}
            onMouseDown={onTouchStart}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialItem key={idx} testimonial={testimonial} />
            ))}
          </ul>
          <div
            className="flex justify-center items-center mt-8"
            data-testid="indicators"
          >
            {indicators.map((idx) => (
              <Button
                key={idx}
                className={cn(
                  'w-1 h-1 ml-1 first:ml-0 rounded-full cursor-pointer',
                  'transition-colors',
                  'motion-reduce:transition-none',
                  'md:w-1.5 md:h-1.5',
                  'lg:w-2 lg:h-2 lg:ml-1.5',
                  'xl:w-2.5 xl:h-2.5 xl:ml-2',
                  idx === swipeIdx
                    ? 'bg-gray-400 dark:bg-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400'
                )}
                onClick={() => indicatorOnClick(idx)}
              >
                <VisuallyHidden>Slide {idx + 1}</VisuallyHidden>
              </Button>
            ))}
          </div>
        </div>
        <small
          className={cn(
            'absolute top-5 right-16 flex items-center border border-transparent bg-white py-2 px-3 shadow-lg select-none pointer-events-none',
            'dark:bg-gray-650 dark:border-gray-400 dark:border-opacity-20',
            'transform transition-transform-opacity duration-700',
            'motion-reduce:transition-none',
            'md:right-20',
            {
              'opacity-0': !shouldDisplayTip,
              'translate-x-6': !shouldDisplayTip,
            }
          )}
        >
          <TipIcon
            className={cn('w-3 h-3 mr-2 animate-pulse', 'md:w-4 md:h-4')}
          />
          Swipe to See More
        </small>
      </div>
    </Section>
  );
}
