import Events from './Events';

class DarkMode extends Events {
  initialized: boolean;
  enabled: boolean;
  _documentElement: HTMLElement | null;

  constructor() {
    super();
    this.initialized = false;
    this.enabled = false;
    this._documentElement = null;
  }

  init = () => {
    this._documentElement = document.documentElement;

    if (
      localStorage.darkModeEnabled === '1' ||
      (!('darkModeEnabled' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.enabled = true;
    } else {
      this.enabled = false;
    }

    this._updateDocumentElement();
    this._onInit();
  };

  toggle = () => {
    const newValue = !this.enabled;

    this.enabled = newValue;

    if (newValue) {
      localStorage.darkModeEnabled = '1';
    } else {
      localStorage.darkModeEnabled = '0';
    }

    this._updateDocumentElement();
    this._onChange();
  };

  _onInit = () => {
    this.initialized = true;
    this.emit('init');
  };

  _onChange = () => {
    this.emit('change', this.enabled);
  };

  _updateDocumentElement = () => {
    const documentElement = this._documentElement as HTMLElement;

    if (this.enabled) {
      documentElement.classList.add('dark');
    } else {
      documentElement.classList.remove('dark');
    }
  };
}

export default new DarkMode();
