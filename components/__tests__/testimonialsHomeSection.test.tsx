import { fireEvent, render, screen } from '@testing-library/react';
import { getFakeNumber, setReadOnlyProperty } from '../../lib/test-helpers';
import * as hooks from '../../lib/hooks';
import * as customHooks from '../../lib/custom-hooks';
import * as ga from '../../lib/google-analytics';
import * as TestimonialItem from '../testimonialItem';
import TestimonialsHomeSection from '../testimonialsHomeSection';

describe('<TestimonialsHomeSection />', () => {
  const testimonials = [
    {
      name: 'Janice Lim',
      jobTitle: 'Product Manager',
      companyName: 'PropertyGuru Pte. Ltd.',
      quote:
        "Having worked with many teams of engineers, very rarely do I encounter engineers like Dom who demonstrate the perfect blend of skills, creativity, and initiative. I'm extremely fortunate to have such engineer on the team. It has not only made my job easier, but we've also ended up with better end products – seamless collaboration, great exchange of ideas, quick and precise execution.",
    },
    {
      name: 'Gary Lim',
      jobTitle: 'Senior UX Designer',
      companyName: 'Razer Inc.',
      quote:
        "Not often do you find an engineer with an eye for design details, and Dominic happens to be one of them. I enjoyed working with him on some projects with complex UI (User Interface) design. Whenever he delivers, it's always a joy to see my design comes alive as I intended. Any designer would be lucky to have Dominic working on his/her design.",
    },
    {
      name: 'Hongzheng Liao (Jansen)',
      jobTitle: 'Director (Software)',
      companyName: 'Razer Inc.',
      quote:
        "It is every manager's dream to have an engineer like Dominic in the team. He is self-driven, confident, proactive and smart. He has brought great value to the team by consistently building and delivering software solutions in time and with great quality. He would always be an indispensable asset to any team he works for in the future and has my highest recommendation.",
    },
    {
      name: 'Vincent Chin',
      jobTitle: 'Managing Partner',
      companyName: 'Hashtag Interactive Pte. Ltd.',
      quote:
        'Dominic has consistently shown a great aptitude for programming and continuously worked on advancing his knowledge in the field whilst performing his day-to-day functions; A self-learner, he was responsible and instrumental in many successful web and app development projects.',
    },
    {
      name: 'Anonymous',
      jobTitle: '',
      companyName: 'PropertyGuru Pte. Ltd.',
      quote:
        'Dom has been very helpful in terms of integrations between front-end and back-end. His pacy and skillful work is commendable. I admire how he thinks in terms of technical implementation and try to align UI components along with front-end tech design. This saves a lot of time to build components and flows.',
    },
    {
      name: 'Hao Long Chiang (Zack)',
      jobTitle: 'Senior Product Developer',
      companyName: 'Razer Inc.',
      quote:
        "He's a really good software engineer. His analytical skill is really very good, he can solve difficult business problems by recommending technical solutions while looking at the business case and discussing with the stakeholders.",
    },
    {
      name: 'Jixiang Li',
      jobTitle: 'Software Engineer',
      companyName: 'Razer Inc.',
      quote:
        'Dominic is a very good colleague to work with. He has excellent engineering and programming skills and I learned a lot from him when doing the same project together. He is also a kind and patient person. I am glad to have worked with him before.',
    },
  ];
  const testimonialsLen = testimonials.length;
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

    testimonials.forEach((testimonial, idx) => {
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
      windowWidth = getFakeNumber();
      containerWidth = Math.round(getFakeNumber({ max: windowWidth }) / 2) * 2; // needs to be even because of swipeWidth can be rounded by browser
      listWidth = containerWidth * testimonialsLen;
      listItemWidth = containerWidth;

      jest
        .spyOn(customHooks, 'useWindowSize')
        .mockReturnValue({ windowWidth, windowHeight: getFakeNumber() });

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
      for (let idx = 1; idx < testimonialsLen; idx++) {
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
      for (let idx = testimonialsLen - 2; idx >= 0; idx--) {
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

    it('should swipe on indicator click', () => {
      const indicatorsEl = screen.queryByTestId('indicators') as HTMLDivElement;
      const indicatorsEls = indicatorsEl.childNodes;
      const listEl = screen.queryByRole('list') as HTMLUListElement;

      expect(indicatorsEls[0]).toHaveClass('bg-gray-400');
      expect(indicatorsEls[0]).not.toHaveClass('bg-gray-200');

      // swipe to the right
      for (let idx = 1; idx < testimonialsLen; idx++) {
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
      for (let idx = testimonialsLen - 2; idx >= 0; idx--) {
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
