import { fireEvent, render, screen } from '@testing-library/react';
import { getFakeNumber, getFakeSentence } from '../../lib/test-helpers';
import * as hooks from '../../lib/hooks';
import Tooltip from '../tooltip';

describe('<Tooltip />', () => {
  describe('content', () => {
    it('should render text', () => {
      const text = getFakeSentence();

      render(<Tooltip position="top">{text}</Tooltip>);

      expect(screen.queryByText(text)).toBeInTheDocument();
    });
  });

  describe('y positions', () => {
    const positions: Array<'top' | 'bottom'> = ['top', 'bottom'];

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should display tooltip and center horizontally', () => {
      positions.forEach((position) => {
        const containerProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };
        const wrapperProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };

        jest
          .spyOn(hooks, 'getRefValue')
          .mockReturnValueOnce(containerProps)
          .mockReturnValueOnce(wrapperProps);

        const text = getFakeSentence();
        const { unmount } = render(
          <Tooltip position={position}>{text}</Tooltip>
        );

        const wrapperEl = screen.queryByText(text) as HTMLDivElement;
        const containerEl = wrapperEl.parentElement as HTMLDivElement;

        // expect to be hidden by default
        expect(wrapperEl).toHaveClass('opacity-0');

        // expect to be displayed on mouse enter
        fireEvent.mouseEnter(containerEl);

        expect(wrapperEl).not.toHaveClass('opacity-0');
        expect(wrapperEl).toHaveStyle({
          left: `${
            (wrapperProps.offsetWidth / 2 - containerProps.offsetWidth / 2) * -1
          }px`,
        });

        // expect to be hidden on mouse leave
        fireEvent.mouseLeave(containerEl);

        expect(wrapperEl).toHaveClass('opacity-0');

        unmount();
      });
    });
  });

  describe('x positions', () => {
    const positions: Array<'right' | 'left'> = ['right', 'left'];

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should display tooltip and center horizontally', () => {
      positions.forEach((position) => {
        const containerProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };
        const wrapperProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };

        jest
          .spyOn(hooks, 'getRefValue')
          .mockReturnValueOnce(containerProps)
          .mockReturnValueOnce(wrapperProps);

        const text = getFakeSentence();
        const { unmount } = render(
          <Tooltip position={position}>{text}</Tooltip>
        );

        const wrapperEl = screen.queryByText(text) as HTMLDivElement;
        const containerEl = wrapperEl.parentElement as HTMLDivElement;

        // expect to be hidden by default
        expect(wrapperEl).toHaveClass('opacity-0');

        // expect to be displayed on mouse enter
        fireEvent.mouseEnter(containerEl);

        expect(wrapperEl).not.toHaveClass('opacity-0');
        expect(wrapperEl).toHaveStyle({
          top: `${
            (wrapperProps.offsetHeight / 2 - containerProps.offsetHeight / 2) *
            -1
          }px`,
        });

        // check to be hidden on mouse leave
        fireEvent.mouseLeave(containerEl);

        expect(wrapperEl).toHaveClass('opacity-0');

        unmount();
      });
    });
  });
});
