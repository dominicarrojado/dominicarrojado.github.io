import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useWindowSize } from '../lib/custom-hooks';
import { getRefValue, useStateRef } from '../lib/hooks';
import { getTouchEventData } from '../lib/dom';
import { trackEvent } from '../lib/google-analytics';
import Section from './section';
import SectionContent from './sectionContent';
import SectionTitle from './sectionTitle';
import TestimonialItem from './testimonialItem';
import SvgTouch from './svgTouch';
import { GoogleAnalyticsEvents } from '../lib/types';
import {
  TESTIMONIALS,
  TESTIMONIALS_SUCCESS_SWIPE_DIFF,
} from '../lib/constants';

function TestimonialsHomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const currentOffsetXRef = useRef(0);
  const newOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const isSwipeTrackedRef = useRef(false);
  const { windowWidth } = useWindowSize();
  const [shouldDisplayTip, setShouldDisplayTip] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    const listEl = getRefValue(listRef);
    const containerEl = getRefValue(containerRef);
    const listWidth = listEl.scrollWidth;
    const containerWidth = containerEl.offsetWidth;
    const offsetXMin = -(listWidth - containerWidth);
    const offsetXMax = 0;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    // add resistance to when swiping on both ends
    if (newOffsetX >= offsetXMax || newOffsetX <= offsetXMin) {
      if (diff > 0) {
        // swipe to the right
        newOffsetX -= (newOffsetX - offsetXMin) * 0.5;
      } else {
        // swipe to the left
        newOffsetX -= (newOffsetX + offsetXMax) * 0.5;
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

    // limit swiping on both ends
    let adjustedOffsetX = newOffsetX;
    adjustedOffsetX = Math.min(adjustedOffsetX, offsetXMax);
    adjustedOffsetX = Math.max(adjustedOffsetX, offsetXMin);

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

  useEffect(() => {
    // reset states on window resize
    setOffsetX(0);
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
      >
        <div
          ref={containerRef}
          className="relative pb-10 cursor-grab active:cursor-grabbing"
        >
          <ul
            ref={listRef}
            className={cn(
              'relative mt-8 flex flex-row items-center select-none',
              'sm:mt-10',
              'lg:mt-12',
              {
                ['transform transition-transform duration-500']: !isSwiping,
              }
            )}
            style={{
              transform: `translate3d(${offsetX}px, 0, 0)`,
              touchAction: 'pan-y',
            }}
            onTouchStart={onTouchStart}
            onMouseDown={onTouchStart}
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialItem key={idx} testimonial={testimonial} />
            ))}
          </ul>
        </div>
        <small
          className={cn(
            'absolute top-5 right-16 flex items-center bg-white py-2 px-3 shadow-lg select-none pointer-events-none',
            'transition transform duration-700',
            'md:right-20',
            {
              'opacity-0': !shouldDisplayTip,
              'translate-x-6': !shouldDisplayTip,
            }
          )}
        >
          <SvgTouch
            className={cn('w-4 h-4 mr-2 animate-pulse', 'md:w-5 md:h-5')}
          />
          Swipe to See More
        </small>
      </div>
    </Section>
  );
}

export default TestimonialsHomeSection;
