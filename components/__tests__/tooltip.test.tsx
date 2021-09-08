import { fireEvent, render, screen } from '@testing-library/react';
import {
  fireEventTransitionEnd,
  getFakeNumber,
  getFakeSentence,
  getFakeWord,
} from '../../lib/test-helpers';
import * as hooks from '../../lib/hooks';
import { TooltipPosition } from '../../lib/types';
import Tooltip from '../tooltip';

describe('<Tooltip />', () => {
  describe('content', () => {
    it('should render text', () => {
      const text = getFakeSentence();

      render(<Tooltip position={TooltipPosition.TOP}>{text}</Tooltip>);

      expect(screen.queryByText(text)).toBeInTheDocument();
    });
  });

  describe('position prop (top, bottom)', () => {
    const positions = [TooltipPosition.TOP, TooltipPosition.BOTTOM];

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should display tooltip and center horizontally', () => {
      positions.forEach((position) => {
        const containerProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };
        const contentProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };

        jest
          .spyOn(hooks, 'getRefValue')
          .mockReturnValueOnce(containerProps)
          .mockReturnValueOnce(contentProps);

        const text = getFakeSentence();
        const { unmount } = render(
          <Tooltip position={position}>{text}</Tooltip>
        );

        const contentEl = screen.queryByText(text) as HTMLDivElement;
        const wrapperEl = contentEl.parentElement as HTMLDivElement;
        const containerEl = wrapperEl.parentElement as HTMLDivElement;

        // expect to be hidden by default
        expect(contentEl).toHaveClass('opacity-0');

        // expect to be displayed on mouse enter
        fireEvent.mouseEnter(containerEl);

        expect(contentEl).not.toHaveClass('opacity-0');
        expect(wrapperEl).toHaveStyle({
          left: `${
            (contentProps.offsetWidth / 2 - containerProps.offsetWidth / 2) * -1
          }px`,
        });

        // expect to be hidden on mouse leave
        fireEvent.mouseLeave(containerEl);

        expect(contentEl).toHaveClass('opacity-0');

        unmount();
      });
    });
  });

  describe('position prop (right, left)', () => {
    const positions = [TooltipPosition.RIGHT, TooltipPosition.LEFT];

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should display tooltip and center horizontally', () => {
      positions.forEach((position) => {
        const containerProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };
        const contentProps = {
          offsetWidth: getFakeNumber(),
          offsetHeight: getFakeNumber(),
        };

        jest
          .spyOn(hooks, 'getRefValue')
          .mockReturnValueOnce(containerProps)
          .mockReturnValueOnce(contentProps);

        const text = getFakeSentence();
        const { unmount } = render(
          <Tooltip position={position}>{text}</Tooltip>
        );

        const contentEl = screen.queryByText(text) as HTMLDivElement;
        const wrapperEl = contentEl.parentElement as HTMLDivElement;
        const containerEl = wrapperEl.parentElement as HTMLDivElement;

        // expect to be hidden by default
        expect(contentEl).toHaveClass('opacity-0');

        // expect to be displayed on mouse enter
        fireEvent.mouseEnter(containerEl);

        expect(contentEl).not.toHaveClass('opacity-0');
        expect(wrapperEl).toHaveStyle({
          top: `${
            (contentProps.offsetHeight / 2 - containerProps.offsetHeight / 2) *
            -1
          }px`,
        });

        // check to be hidden on mouse leave
        fireEvent.mouseLeave(containerEl);

        expect(contentEl).toHaveClass('opacity-0');

        unmount();
      });
    });
  });

  describe('show prop', () => {
    it('should display tooltip if show is true', () => {
      const text = getFakeSentence();

      render(<Tooltip show={true}>{text}</Tooltip>);

      const contentEl = screen.queryByText(text) as HTMLDivElement;

      expect(contentEl).not.toHaveClass('opacity-0');
    });

    it('should NOT hide tooltip on mouse leave if show is true', () => {
      const text = getFakeSentence();

      render(<Tooltip show={true}>{text}</Tooltip>);

      const contentEl = screen.queryByText(text) as HTMLDivElement;
      const containerEl = contentEl.parentElement as HTMLDivElement;

      fireEvent.mouseLeave(containerEl);

      expect(contentEl).not.toHaveClass('opacity-0');
    });

    it('should hide tooltip if show is false', () => {
      const text = getFakeSentence();

      render(<Tooltip show={false}>{text}</Tooltip>);

      const contentEl = screen.queryByText(text) as HTMLDivElement;

      expect(contentEl).toHaveClass('opacity-0');
    });

    it('should NOT display tooltip on mouse enter if show is false', () => {
      const text = getFakeSentence();

      render(<Tooltip show={false}>{text}</Tooltip>);

      const contentEl = screen.queryByText(text) as HTMLDivElement;
      const containerEl = contentEl.parentElement as HTMLDivElement;

      fireEvent.mouseEnter(containerEl);

      expect(contentEl).toHaveClass('opacity-0');
    });
  });

  describe('className prop', () => {
    it('should add class', () => {
      const text = getFakeSentence();
      const className = getFakeWord();

      render(<Tooltip className={className}>{text}</Tooltip>);

      const contentEl = screen.queryByText(text) as HTMLDivElement;

      expect(contentEl).toHaveClass(className);
    });
  });

  describe('onHidden prop', () => {
    it('should trigger on transition end of opacity', () => {
      const onHiddenMock = jest.fn();

      const text = getFakeSentence();

      render(<Tooltip onHidden={onHiddenMock}>{text}</Tooltip>);

      const tooltipEl = screen.queryByText(text) as HTMLDivElement;

      fireEventTransitionEnd(tooltipEl, 'opacity');

      expect(onHiddenMock).toBeCalledTimes(1);
    });

    it('should NOT trigger on transition end of other prop name', () => {
      const onHiddenMock = jest.fn();

      const text = getFakeSentence();

      render(<Tooltip onHidden={onHiddenMock}>{text}</Tooltip>);

      const tooltipEl = screen.queryByText(text) as HTMLDivElement;

      fireEventTransitionEnd(tooltipEl, getFakeWord());

      expect(onHiddenMock).not.toBeCalled();
    });
  });
});
