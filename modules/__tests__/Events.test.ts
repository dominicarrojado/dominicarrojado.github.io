import Events from '../Events';

describe('Events module', () => {
  it('can store events', () => {
    const events = new Events();
    const event = 'test';
    const callback = jest.fn();

    events.on(event, callback);

    expect(events.events[event]).toEqual([callback]);
  });

  it('can remove events', () => {
    const events = new Events();
    const event = 'test';
    const callback = jest.fn();
    const callback2 = jest.fn();

    events.on(event, callback);
    events.on(event, callback2);
    events.off(event, callback);
    events.emit(event);

    expect(events.events[event]).toEqual([callback2]);
    expect(callback).toBeCalledTimes(0);
  });

  it('can emit events', () => {
    const events = new Events();
    const event = 'test';
    const event2 = 'test2';
    const callback = jest.fn();
    const callback2 = jest.fn();

    events.on(event, callback);
    events.on(event, callback);
    events.on(event2, callback2);
    events.emit(event);
    events.emit(event2);

    expect(callback).toBeCalledTimes(2);
    expect(callback2).toBeCalledTimes(1);
  });

  it('should handle remove events but event does not exist', () => {
    const events = new Events();

    expect(() => {
      events.off('test', jest.fn());
    }).not.toThrowError();
  });

  it('should handle remove events but callback does not exist', () => {
    const events = new Events();
    const event = 'test';
    const callback = jest.fn();

    events.on(event, callback);

    expect(() => {
      events.off(event, jest.fn());
    }).not.toThrowError();

    events.emit(event);

    expect(callback).toBeCalledTimes(1);
  });

  it('should handle emit events but event does not exist', () => {
    const events = new Events();

    expect(() => {
      events.emit('test');
    }).not.toThrowError();
  });
});
