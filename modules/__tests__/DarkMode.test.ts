import DarkMode from '../DarkMode';

describe('DarkMode module', () => {
  const matchMediaOrig = window.matchMedia;

  beforeEach(() => {
    window.matchMedia = jest.fn(() => ({ matches: false } as MediaQueryList));
  });

  afterEach(() => {
    jest.restoreAllMocks();

    DarkMode.initialized = false;
    DarkMode.enabled = false;
    DarkMode._documentElement = null;
    document.documentElement.classList.remove('dark');
    localStorage.clear();
    window.matchMedia = matchMediaOrig;
  });

  it('should initialize and return default values', () => {
    const onInit = jest.fn();

    DarkMode.on('init', onInit);
    DarkMode.init();

    expect(DarkMode.initialized).toBe(true);
    expect(DarkMode.enabled).toBe(false);
    expect(onInit).toBeCalledTimes(1);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('shoud return enabled true if query media matches', () => {
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: query === '(prefers-color-scheme: dark)',
        } as MediaQueryList)
    );

    DarkMode.init();

    expect(DarkMode.enabled).toBe(true);
    expect(document.documentElement).toHaveClass('dark');
  });

  it('should return enabled false if local storage key is 0', () => {
    localStorage.darkModeEnabled = '0';

    DarkMode.init();

    expect(DarkMode.enabled).toBe(false);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('should return enabled true if local storage key is 1', () => {
    localStorage.darkModeEnabled = '1';

    DarkMode.init();

    expect(DarkMode.enabled).toBe(true);
    expect(document.documentElement).toHaveClass('dark');
  });

  it('should update local storage on toggle', () => {
    const onChange = jest.fn();

    DarkMode.on('change', onChange);
    DarkMode.init();
    DarkMode.toggle();

    expect(DarkMode.enabled).toBe(true);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(true);
    expect(localStorage.darkModeEnabled).toBe('1');
    expect(document.documentElement).toHaveClass('dark');

    onChange.mockClear();

    DarkMode.toggle();

    expect(DarkMode.enabled).toBe(false);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(false);
    expect(localStorage.darkModeEnabled).toBe('0');
    expect(document.documentElement).not.toHaveClass('dark');
  });
});
