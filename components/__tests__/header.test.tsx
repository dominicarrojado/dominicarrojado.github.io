import { cloneElement } from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { config } from 'react-transition-group';
import * as Link from 'next/link';
import Window from '../../modules/Window';
import {
  fireEventTransitionEnd,
  getFakeWord,
  getRandomRoute,
  setReadOnlyProperty,
} from '../../lib/test-helpers';
import * as ga from '../../lib/google-analytics';
import * as dom from '../../lib/dom';
import { MENU_ITEMS, SOCIAL_LINKS } from '../../lib/constants';
import { Route } from '../../lib/types';
import Header from '../header';

config.disabled = true; // disable react-transitions-group transitions

describe('<Header />', () => {
  const renderComponent = (route: Route) => {
    render(<Header route={route} />);
  };

  beforeEach(() => {
    // need to mock <Link /> if you need to fire "click" event as it will throw an error
    jest
      .spyOn(Link, 'default')
      .mockImplementation(
        ({ href, children }) =>
          (<>{cloneElement(children as any, { href })}</>) as any
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('content', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());
    });

    it('should have expected menu items', () => {
      MENU_ITEMS.forEach((menu) => {
        const anchorEl = screen.queryByText(menu.title);

        expect(anchorEl).toHaveAttribute('href', menu.path);
        expect(anchorEl).not.toHaveAttribute('target');
        expect(anchorEl).not.toHaveAttribute('rel');
      });
    });

    it('should have expected social items', () => {
      SOCIAL_LINKS.forEach((social) => {
        const anchorEl = screen.queryByTitle(social.title);

        expect(anchorEl).toHaveAttribute('href', social.url);
        expect(anchorEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
        expect(anchorEl).toHaveAttribute('target', '_blank');
      });
    });
  });

  describe('menu is NOT opened', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());
    });

    it('should have expected button text', () => {
      const text = 'Menu';

      expect(screen.queryByText(text)).toBeInTheDocument();
    });

    it('should hide menu background', () => {
      const menuBackgroundEl = screen.queryByTestId('menu-background');

      expect(menuBackgroundEl).toHaveClass('opacity-0 delay-100');
    });

    it('should hide the menu items', () => {
      MENU_ITEMS.forEach((menu) => {
        const anchorEl = screen.queryByText(menu.title);
        const listEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listEl).toHaveClass('opacity-0');
      });
    });

    it('should hide the social items', () => {
      SOCIAL_LINKS.forEach((social) => {
        const anchorEl = screen.queryByTitle(social.title);
        const listEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listEl).toHaveClass('opacity-0');
      });
    });
  });

  describe('menu is opened', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());

      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);
    });

    it('should have expected button text', () => {
      const text = 'Close';

      expect(screen.queryByText(text)).toBeInTheDocument();
    });

    it('should display menu background', () => {
      const menuBackgroundEl = screen.queryByTestId('menu-background');

      expect(menuBackgroundEl).not.toHaveClass('opacity-0 delay-100');
    });

    it('should display the menu items', () => {
      MENU_ITEMS.forEach((menu) => {
        const anchorEl = screen.queryByText(menu.title);
        const listEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listEl).not.toHaveClass('opacity-0');
      });
    });

    it('should display the social items', () => {
      SOCIAL_LINKS.forEach((social) => {
        const anchorEl = screen.queryByTitle(social.title);
        const listEl = anchorEl?.closest('li') as HTMLLIElement;

        expect(listEl).not.toHaveClass('opacity-0');
      });
    });
  });

  describe('<Logo />', () => {
    describe('home route', () => {
      const windowPageYOffset = window.pageYOffset;

      beforeEach(() => {
        renderComponent(Route.HOME);
      });

      afterEach(() => {
        setReadOnlyProperty(window, 'pageYOffset', windowPageYOffset);
      });

      it('should NOT display logo by default', () => {
        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should NOT display logo on window load', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should display logo on scroll past hero section (window height)', () => {
        act(() => {
          Window.emit('load');

          setReadOnlyProperty(window, 'pageYOffset', window.innerHeight);
          Window.emit('scroll');
        });

        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).not.toHaveClass('opacity-0');
      });

      it('should NOT have animation delay by default', () => {
        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).not.toHaveClass('delay-700');
      });
    });

    describe('other routes except home', () => {
      const getRandomRouteExceptHome = (): Route => {
        const route = getRandomRoute();

        if (route === Route.HOME) {
          return getRandomRouteExceptHome();
        }

        return route;
      };

      beforeEach(() => {
        renderComponent(getRandomRouteExceptHome());
      });

      it('should NOT display logo by default', () => {
        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should display logo on window load', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).not.toHaveClass('opacity-0');
      });

      it('should have animation delay by default', () => {
        const logoEl = screen.queryByTestId('logo');

        expect(logoEl).toHaveClass('delay-700');
      });

      it('should NOT have animation delay by default on transition end of opacity', () => {
        const logoEl = screen.queryByTestId('logo') as HTMLAnchorElement;

        fireEventTransitionEnd(logoEl, 'opacity');

        expect(logoEl).not.toHaveClass('delay-700');
      });

      it('should have animation delay on transition end of other prop name', () => {
        const logoEl = screen.queryByTestId('logo') as HTMLAnchorElement;

        fireEventTransitionEnd(logoEl, getFakeWord());

        expect(logoEl).toHaveClass('delay-700');
      });
    });
  });

  describe('<Button />', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());
    });

    it('should NOT be clickable by default', () => {
      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      expect(btnEl).toHaveClass('pointer-events-none');
    });

    it('should NOT be clickable on transition end of other prop name', () => {
      const btnTextEl = screen.queryByText('Menu') as HTMLDivElement;
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEventTransitionEnd(btnTextEl, getFakeWord());

      expect(btnEl).toHaveClass('pointer-events-none');
    });

    it('should NOT be clickable on transition end of opacity', () => {
      const btnTextEl = screen.queryByText('Menu') as HTMLDivElement;
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEventTransitionEnd(btnTextEl, 'opacity');

      expect(btnEl).not.toHaveClass('pointer-events-none');
    });

    it('should be hidden when window is NOT loaded', () => {
      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;
      const stacks = btnEl.querySelectorAll('div');

      expect(btnTextEl).toHaveClass('opacity-0');

      stacks.forEach((stack) => {
        expect(stack).toHaveClass('opacity-0');
      });
    });

    it('should display when window is loaded', () => {
      act(() => {
        Window.emit('load');
      });

      const btnTextEl = screen.queryByText('Menu') as HTMLDivElement;
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;
      const stacks = btnEl.querySelectorAll('div');

      stacks.forEach((stack) => {
        expect(stack).not.toHaveClass('opacity-0');
      });
    });

    it('should track as hover if NOT clicked', () => {
      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.mouseLeave(btnEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'header_btn_hover',
        hoverText: 'Menu',
      });
    });

    it('should track menu click', () => {
      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'header_btn_click',
        linkText: 'Menu',
      });
    });

    it('should track close click', () => {
      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      trackEventSpy.mockClear();

      fireEvent.click(btnEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'header_btn_click',
        linkText: 'Close',
      });
    });

    it('should NOT track as hover if clicked', () => {
      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      trackEventSpy.mockClear();

      fireEvent.mouseLeave(btnEl);

      expect(trackEventSpy).not.toBeCalled();
    });
  });

  describe('<MenuItems />', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());
    });

    MENU_ITEMS.forEach((menu) => {
      describe(`menu item (${menu.title}) on click`, () => {
        beforeEach(() => {
          act(() => {
            Window.emit('load');
          });

          let btnTextEl = screen.queryByText('Menu') as HTMLDivElement;

          // triggered because it has different transition style than initial load
          fireEventTransitionEnd(btnTextEl, 'opacity');

          const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

          // open menu
          fireEvent.click(btnEl);

          // click menu item
          const anchorEl = screen.queryByText(menu.title) as HTMLAnchorElement;

          fireEvent.click(anchorEl);

          // following test expects that menu will be closed automatically
        });

        it('should have expected button text', () => {
          const text = 'Menu';

          expect(screen.queryByText(text)).toBeInTheDocument();
        });

        it('should hide menu background', () => {
          const menuBackgroundEl = screen.queryByTestId('menu-background');

          expect(menuBackgroundEl).toHaveClass('opacity-0');
        });

        it('should hide the menu items', () => {
          MENU_ITEMS.forEach((menu) => {
            const anchorEl = screen.queryByText(menu.title);
            const listEl = anchorEl?.closest('li') as HTMLLIElement;

            expect(listEl).toHaveClass('opacity-0');
          });
        });

        it('should hide the social items', () => {
          SOCIAL_LINKS.forEach((social) => {
            const anchorEl = screen.queryByTitle(social.title);
            const listEl = anchorEl?.closest('li') as HTMLLIElement;

            expect(listEl).toHaveClass('opacity-0');
          });
        });
      });
    });
  });

  describe('<Social />', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());
    });

    it('should handle normal links', () => {
      SOCIAL_LINKS.forEach((social) => {
        if (social.shouldCopyOnClick) {
          return;
        }

        const copyTextToClipboardMock = jest.spyOn(dom, 'copyTextToClipboard');

        const { title } = social;
        const copySuccessText = 'Copied!';
        const anchorEl = screen.queryByTitle(title) as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(copyTextToClipboardMock).not.toBeCalled();
        expect(screen.queryByText(copySuccessText)).not.toBeInTheDocument();

        copyTextToClipboardMock.mockClear();
      });
    });

    it('should handle copy text if available', () => {
      SOCIAL_LINKS.forEach((social) => {
        if (!social.shouldCopyOnClick) {
          return;
        }

        const copyTextToClipboardMock = jest
          .spyOn(dom, 'copyTextToClipboard')
          .mockReturnValue(true);

        const { title } = social;
        const textToCopy = social.url.replace('mailto:', '');
        const copySuccessText = 'Copied!';
        const anchorEl = screen.queryByTitle(title) as HTMLAnchorElement;

        // expect text to be copied on click
        fireEvent.click(anchorEl);

        expect(copyTextToClipboardMock).toBeCalledTimes(1);
        expect(copyTextToClipboardMock).toBeCalledWith(textToCopy);
        expect(screen.queryByText(copySuccessText)).toBeInTheDocument();

        // expect "Copied!" to be hidden on mouse leave
        fireEvent.mouseLeave(anchorEl);

        expect(screen.queryByText(copySuccessText)).not.toBeInTheDocument();

        copyTextToClipboardMock.mockClear();
      });
    });

    it('should handle copy text if unavailable', () => {
      SOCIAL_LINKS.forEach((social) => {
        if (!social.shouldCopyOnClick) {
          return;
        }

        const copyTextToClipboardMock = jest
          .spyOn(dom, 'copyTextToClipboard')
          .mockReturnValue(false);

        const { title } = social;
        const textToCopy = social.url.replace('mailto:', '');
        const copySuccessText = 'Copied!';
        const anchorEl = screen.queryByTitle(title) as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(copyTextToClipboardMock).toBeCalledTimes(1);
        expect(copyTextToClipboardMock).toBeCalledWith(textToCopy);
        expect(screen.queryByText(copySuccessText)).not.toBeInTheDocument();

        copyTextToClipboardMock.mockClear();
      });
    });

    it('should track as hover if NOT clicked', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const { title } = social;
        const anchorEl = screen.queryByTitle(title) as HTMLAnchorElement;

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).toHaveBeenCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          event: 'social_hover',
          socialName: social.name,
          hoverText: title,
          hoverUrl: social.url,
        });

        trackEventSpy.mockClear();
      });
    });

    it('should track click', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        jest.spyOn(dom, 'copyTextToClipboard').mockImplementation();

        const { title } = social;
        const anchorEl = screen.queryByTitle(title) as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        expect(trackEventSpy).toHaveBeenCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          event: 'social_click',
          socialName: social.name,
          linkText: title,
          linkUrl: social.url,
        });

        trackEventSpy.mockClear();
      });
    });

    it('should NOT track as hover if clicked', () => {
      SOCIAL_LINKS.forEach((social) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        jest.spyOn(dom, 'copyTextToClipboard').mockImplementation();

        const { title } = social;
        const anchorEl = screen.queryByTitle(title) as HTMLAnchorElement;

        fireEvent.click(anchorEl);

        trackEventSpy.mockClear();

        fireEvent.mouseLeave(anchorEl);

        expect(trackEventSpy).not.toBeCalled();
      });
    });
  });
});
