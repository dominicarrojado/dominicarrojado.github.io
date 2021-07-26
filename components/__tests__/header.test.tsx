import { cloneElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as Link from 'next/link';
import { config } from 'react-transition-group';
import { MENU_ITEMS, SOCIAL_LINKS } from '../../lib/constants';
import Header from '../header';

config.disabled = true; // disable react-transitions-group transitions

describe('<Header />', () => {
  beforeEach(() => {
    jest
      .spyOn(Link, 'default')
      .mockImplementation(
        ({ href, children }) =>
          (<>{cloneElement(children as any, { href })}</>) as any
      );

    render(<Header />);
  });

  describe('content', () => {
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

  describe('menu is opened', () => {
    beforeEach(() => {
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

      expect(menuBackgroundEl).not.toHaveClass('opacity-0');
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

  describe('<MenuItems />', () => {
    MENU_ITEMS.forEach((menu) => {
      describe(`menu item (${menu.title}) on click`, () => {
        beforeEach(() => {
          let btnTextEl = screen.queryByText('Menu');
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
});
