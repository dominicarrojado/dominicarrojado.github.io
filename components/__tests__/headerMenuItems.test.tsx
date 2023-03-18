import { fireEvent, render, screen } from '@testing-library/react';
import { getFakeBoolean, getFakeNumber } from '../../lib/test-helpers';
import { MENU_ITEMS, MENU_ITEMS_LENGTH } from '../../lib/constants';
import * as NextLink from '../nextLink';
import HeaderMenuItems, { Props } from '../headerMenuItems';

describe('<HeaderMenuItems />', () => {
  const renderComponent = (props: Props) =>
    render(<HeaderMenuItems {...props} />);

  it('should have expected menu items', () => {
    renderComponent({ shouldDisplay: getFakeBoolean(), closeMenu: jest.fn() });

    MENU_ITEMS.forEach((menu) => {
      const anchorEl = screen.queryByText(menu.title);

      expect(anchorEl).toHaveAttribute('href', menu.path);
      expect(anchorEl).not.toHaveAttribute('target');
      expect(anchorEl).not.toHaveAttribute('rel');
    });
  });

  it('should have expected class by default', () => {
    renderComponent({ shouldDisplay: false, closeMenu: jest.fn() });

    MENU_ITEMS.forEach((menu) => {
      const anchorEl = screen.queryByText(menu.title);
      const listItemEl = anchorEl?.closest('li');

      expect(listItemEl).toHaveClass('opacity-0');
      expect(listItemEl).toHaveClass('duration-300');
    });
  });

  it('should have expected class on display', () => {
    renderComponent({ shouldDisplay: true, closeMenu: jest.fn() });

    MENU_ITEMS.forEach((menu) => {
      const anchorEl = screen.queryByText(menu.title);
      const listItemEl = anchorEl?.closest('li');

      expect(listItemEl).toHaveClass('opacity-100');
      expect(listItemEl).toHaveClass('duration-700');
    });
  });

  it('should close menu on menu item click', () => {
    jest
      .spyOn(NextLink, 'default')
      .mockImplementation(({ children }) => <>{children}</>);

    const closeMenuMock = jest.fn();

    renderComponent({
      shouldDisplay: getFakeBoolean(),
      closeMenu: closeMenuMock,
    });

    const randomIdx = getFakeNumber({ min: 0, max: MENU_ITEMS_LENGTH - 1 });
    const randomMenuItem = MENU_ITEMS[randomIdx];

    const menuItemEl = screen.queryByText(
      randomMenuItem.title
    ) as HTMLAnchorElement;

    fireEvent.click(menuItemEl);

    expect(closeMenuMock).toBeCalledTimes(1);
  });
});
