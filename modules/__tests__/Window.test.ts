import { setReadOnlyProperty } from '../../lib/test-helpers';
import Window from '../Window';

describe('Window module', () => {
  const resetWindowStates = () => {
    Window.loaded = false;
  };

  beforeEach(() => {
    resetWindowStates();
  });

  it('should be loaded if document.readyState is complete', () => {
    setReadOnlyProperty(document, 'readyState', 'complete');

    const onLoad = jest.fn();

    Window.on('load', onLoad);
    Window.init();

    expect(Window.loaded).toBe(true);
    expect(onLoad).toBeCalledTimes(1);
  });

  it('should dispatch load event if document.readyState is loading', () => {
    setReadOnlyProperty(document, 'readyState', 'loading');

    const onLoad = jest.fn();

    Window.on('load', onLoad);
    Window.init();

    window.dispatchEvent(new Event('load'));

    expect(Window.loaded).toBe(true);
    expect(onLoad).toBeCalledTimes(1);
  });

  it('should dispatch scroll event', () => {
    const onScroll = jest.fn();

    Window.init();
    Window.on('scroll', onScroll);

    window.dispatchEvent(new Event('scroll'));

    expect(onScroll).toBeCalled();
  });
});
