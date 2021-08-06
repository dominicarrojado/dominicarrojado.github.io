import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { GoogleAnalyticsEvents, Testimonial } from '../lib/types';

function TestimonialsHomeSection({
  testimonials,
}: {
  testimonials: Array<Testimonial>;
}) {
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const containerWidthRef = useRef(0);
  const isSwipeTrackedRef = useRef(false);
  const { windowWidth, windowWidthRef } = useWindowSize();
  const [shouldDisplayTip, setShouldDisplayTip] = useState(true);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const itemWidth = useMemo(() => {
    switch (true) {
      case windowWidth < 475:
        return windowWidth;

      case windowWidth < 640:
        return windowWidth * 0.9;

      case windowWidth < 1024:
        return windowWidth * 0.85;

      case windowWidth < 1280:
        return windowWidth / 2;

      default:
        return windowWidth / 3;
    }
  }, [windowWidth]);
  const containerWidth = useMemo(
    () => itemWidth * testimonials.length,
    [itemWidth, testimonials]
  );

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const diff = getRefValue(startXRef) - getTouchEventData(e).clientX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    // limit swiping on both ends
    newOffsetX = Math.min(newOffsetX, 0);
    newOffsetX = Math.max(
      newOffsetX,
      (getRefValue(containerWidthRef) - getRefValue(windowWidthRef)) * -1
    );

    if (newOffsetX < -40) {
      setShouldDisplayTip(false);

      if (!getRefValue(isSwipeTrackedRef)) {
        isSwipeTrackedRef.current = true;
        trackEvent({
          event: GoogleAnalyticsEvents.TESTIMONIALS_SWIPE,
        });
      }
    }

    setOffsetX(newOffsetX);
  };
  const onTouchEnd = () => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mouseup', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
  };
  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    startXRef.current = getTouchEventData(e).clientX;
    currentOffsetXRef.current = getRefValue(offsetXRef);

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };

  useEffect(() => {
    containerWidthRef.current = containerWidth;

    // reset states on window resize
    setOffsetX(0);
    setShouldDisplayTip(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

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
          className="pb-10 cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onMouseDown={onTouchStart}
        >
          <ul
            className={cn(
              'relative w-full mt-8 flex items-center select-none',
              'sm:mt-10',
              'lg:mt-12'
            )}
            style={{
              width: containerWidth,
              transform: `translateX(${offsetX}px)`,
              touchAction: 'pan-y',
            }}
            data-testid="container"
          >
            {testimonials.map((testimonial, idx) => (
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
