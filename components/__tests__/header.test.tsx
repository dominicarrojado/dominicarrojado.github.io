import { cloneElement } from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { config } from 'react-transition-group';
import * as Link from 'next/link';
import Window from '../../modules/Window';
import DarkMode from '../../modules/DarkMode';
import {
  fireEventTransitionEnd,
  getFakeString,
  getFakeWord,
  getRandomRoute,
  setReadOnlyProperty,
} from '../../lib/test-helpers';
import { Route } from '../../lib/types';
import { MENU_ITEMS, SOCIAL_LINKS } from '../../lib/constants';
import * as ga from '../../lib/google-analytics';
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

    it('should NOT add padding to fixed elements based on scroll bar width', () => {
      const socialItemsEl = screen.queryByTestId('header-social');
      const buttonsEl = screen.queryByTestId('header-buttons');
      const bodyEl = document.body;
      const scrollBarWidth = window.innerWidth - bodyEl.offsetWidth;
      const expectedStyle = { paddingRight: `${scrollBarWidth}px` };

      expect(buttonsEl).not.toHaveStyle(expectedStyle);
      expect(socialItemsEl).not.toHaveStyle(expectedStyle);
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

    it('should add padding to fixed elements based on scroll bar width', () => {
      const socialItemsEl = screen.queryByTestId('header-social');
      const buttonsEl = screen.queryByTestId('header-buttons');
      const bodyEl = document.body;
      const scrollBarWidth = window.innerWidth - bodyEl.offsetWidth;
      const expectedStyle = { paddingRight: `${scrollBarWidth}px` };

      expect(buttonsEl).toHaveStyle(expectedStyle);
      expect(socialItemsEl).toHaveStyle(expectedStyle);
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
        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should NOT display logo on window load', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should display logo on scroll past hero section (window height)', () => {
        act(() => {
          Window.emit('load');

          setReadOnlyProperty(window, 'pageYOffset', window.innerHeight);
          Window.emit('scroll');
        });

        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

        expect(logoEl).not.toHaveClass('opacity-0');
      });

      it('should display logo on focus', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByLabelText(
          'Dominic Arrojado logo'
        ) as HTMLAnchorElement;

        fireEvent.focus(logoEl);

        expect(logoEl).not.toHaveClass('opacity-0');
      });

      it('should NOT display logo on blur', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByLabelText(
          'Dominic Arrojado logo'
        ) as HTMLAnchorElement;

        fireEvent.focus(logoEl);
        fireEvent.blur(logoEl);

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should NOT display logo on click', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByLabelText(
          'Dominic Arrojado logo'
        ) as HTMLAnchorElement;

        fireEvent.focus(logoEl);
        fireEvent.click(logoEl);

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should NOT have animation delay by default', () => {
        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

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
        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

        expect(logoEl).toHaveClass('opacity-0');
      });

      it('should display logo on window load', () => {
        act(() => {
          Window.emit('load');
        });

        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

        expect(logoEl).not.toHaveClass('opacity-0');
      });

      it('should have animation delay by default', () => {
        const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

        expect(logoEl).toHaveClass('delay-700');
      });

      it('should NOT have animation delay by default on transition end of opacity', () => {
        const logoEl = screen.queryByLabelText(
          'Dominic Arrojado logo'
        ) as HTMLAnchorElement;

        fireEventTransitionEnd(logoEl, 'opacity');

        expect(logoEl).not.toHaveClass('delay-700');
      });

      it('should have animation delay on transition end of other prop name', () => {
        const logoEl = screen.queryByLabelText(
          'Dominic Arrojado logo'
        ) as HTMLAnchorElement;

        fireEventTransitionEnd(logoEl, getFakeWord());

        expect(logoEl).toHaveClass('delay-700');
      });
    });
  });

  describe('<ThemeButton />', () => {
    const matchMediaOrig = window.matchMedia;

    beforeEach(() => {
      window.matchMedia = jest.fn(() => ({ matches: false } as MediaQueryList));

      DarkMode.init();
    });

    afterEach(() => {
      DarkMode.initialized = false;
      DarkMode.enabled = false;
      DarkMode._documentElement = null;
      document.documentElement.classList.remove('dark');
      localStorage.clear();
      window.matchMedia = matchMediaOrig;
    });

    it('should have expected text for light theme', () => {
      renderComponent(getRandomRoute());

      expect(screen.queryByText('Light')).toBeInTheDocument();
      expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    });

    it('should have expected text for dark theme', () => {
      DarkMode.enabled = true;

      renderComponent(getRandomRoute());

      expect(screen.queryByText('Dark')).toBeInTheDocument();
      expect(screen.queryByText('Light')).not.toBeInTheDocument();
    });

    it('should NOT display by default', () => {
      renderComponent(getRandomRoute());

      const btnTextEl = screen.queryByText('Light');
      const btnIconContainerEl = btnTextEl?.previousElementSibling;

      expect(btnTextEl).toHaveClass('opacity-0');
      expect(btnIconContainerEl).toHaveClass('opacity-0');
    });

    it('should display on window load', () => {
      renderComponent(getRandomRoute());

      act(() => {
        Window.emit('load');
      });

      const btnTextEl = screen.queryByText('Light');
      const btnIconContainerEl = btnTextEl?.previousElementSibling;

      expect(btnTextEl).not.toHaveClass('opacity-0');
      expect(btnIconContainerEl).not.toHaveClass('opacity-0');
    });

    it('should have shorter transition duration on click', () => {
      renderComponent(getRandomRoute());

      let btnTextEl = screen.queryByText('Light');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;
      let btnIconContainerEl = btnTextEl?.previousElementSibling;

      expect(btnIconContainerEl).toHaveClass('duration-700');
      expect(btnTextEl).toHaveClass('duration-700');

      fireEvent.click(btnEl);

      btnTextEl = screen.queryByText('Dark');
      btnIconContainerEl = btnTextEl?.previousElementSibling;

      expect(btnIconContainerEl).toHaveClass('duration-150');
      expect(btnTextEl).toHaveClass('duration-150');
    });

    it('should have shorter transition duration on transition end of opacity', () => {
      renderComponent(getRandomRoute());

      const btnTextEl = screen.queryByText('Light') as HTMLDivElement;
      const btnIconContainerEl = btnTextEl?.previousElementSibling;

      expect(btnIconContainerEl).toHaveClass('duration-700');
      expect(btnTextEl).toHaveClass('duration-700');

      fireEventTransitionEnd(btnTextEl, 'opacity');

      expect(btnIconContainerEl).toHaveClass('duration-150');
      expect(btnTextEl).toHaveClass('duration-150');
    });

    it('should have shorter transition duration on transition end of other prop name', () => {
      renderComponent(getRandomRoute());

      const btnTextEl = screen.queryByText('Light') as HTMLDivElement;
      const btnIconContainerEl = btnTextEl?.previousElementSibling;

      fireEventTransitionEnd(btnTextEl, getFakeString());

      expect(btnIconContainerEl).toHaveClass('duration-700');
      expect(btnTextEl).toHaveClass('duration-700');
    });

    it('should change text on click', () => {
      renderComponent(getRandomRoute());

      const btnTextEl = screen.queryByText('Light');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      expect(screen.queryByText('Dark')).toBeInTheDocument();
      expect(screen.queryByText('Light')).not.toBeInTheDocument();

      fireEvent.click(btnEl);

      expect(screen.queryByText('Light')).toBeInTheDocument();
      expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    });

    it('should track as hover if NOT clicked', () => {
      renderComponent(getRandomRoute());

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Light');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.mouseLeave(btnEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'theme_btn_hover',
        hoverText: 'Light',
      });
    });

    it('should track menu click', () => {
      renderComponent(getRandomRoute());

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Light');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'theme_btn_click',
        linkText: 'Light',
      });
    });

    it('should track close click', () => {
      renderComponent(getRandomRoute());

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Light');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      trackEventSpy.mockClear();

      fireEvent.click(btnEl);

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        event: 'theme_btn_click',
        linkText: 'Dark',
      });
    });

    it('should NOT track as hover if clicked', () => {
      renderComponent(getRandomRoute());

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');

      const btnTextEl = screen.queryByText('Light');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      trackEventSpy.mockClear();

      fireEvent.mouseLeave(btnEl);

      expect(trackEventSpy).not.toBeCalled();
    });
  });

  describe('<MenuButton />', () => {
    beforeEach(() => {
      renderComponent(getRandomRoute());
    });

    it('should NOT display by default', () => {
      const btnTextEl = screen.queryByText('Menu');
      const stacks = screen.queryAllByTestId('menu-stack');

      expect(btnTextEl).toHaveClass('opacity-0');

      stacks.forEach((stack) => {
        expect(stack).toHaveClass('opacity-0');
      });
    });

    it('should display on window load', () => {
      act(() => {
        Window.emit('load');
      });

      const btnTextEl = screen.queryByText('Menu') as HTMLDivElement;
      const stacks = screen.queryAllByTestId('menu-stack');

      expect(btnTextEl).not.toHaveClass('opacity-0');

      stacks.forEach((stack) => {
        expect(stack).not.toHaveClass('opacity-0');
      });
    });

    it('should have shorter transition duration on click', () => {
      let btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;
      const stacks = screen.queryAllByTestId('menu-stack');

      stacks.forEach((stack) => {
        expect(stack).toHaveClass('duration-1000');
      });
      expect(btnTextEl).toHaveClass('duration-700');

      fireEvent.click(btnEl);

      stacks.forEach((stack) => {
        expect(stack).toHaveClass('duration-300');
      });

      btnTextEl = screen.queryByText('Close');

      expect(btnTextEl).toHaveClass('duration-150');
    });

    it('should have shorter transition duration on transition end of other prop name', () => {
      const btnTextEl = screen.queryByText('Menu') as HTMLDivElement;
      const stacks = screen.queryAllByTestId('menu-stack');

      fireEventTransitionEnd(btnTextEl, getFakeString());

      stacks.forEach((stack) => {
        expect(stack).toHaveClass('duration-1000');
      });
      expect(btnTextEl).toHaveClass('duration-700');
    });

    it('should change text on click', () => {
      const btnTextEl = screen.queryByText('Menu');
      const btnEl = btnTextEl?.closest('button') as HTMLButtonElement;

      fireEvent.click(btnEl);

      expect(screen.queryByText('Close')).toBeInTheDocument();
      expect(screen.queryByText('Menu')).not.toBeInTheDocument();

      fireEvent.click(btnEl);

      expect(screen.queryByText('Menu')).toBeInTheDocument();
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
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
