import Events from './Events';

class Window extends Events {
  loaded: boolean;

  constructor() {
    super();
    this.loaded = false;
  }

  init = () => {
    if (document.readyState === 'complete') {
      this._onLoad();
    } else {
      window.addEventListener('load', this._onLoad);
    }

    window.addEventListener('scroll', (e) => this.emit('scroll', e));
  };

  _onLoad = () => {
    this.loaded = true;
    this.emit('load');
  };
}

export default new Window();
