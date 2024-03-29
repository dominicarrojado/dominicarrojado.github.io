import { getMoveTo } from '../imports';

describe('imports utilities', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return MoveTo', async () => {
    const MoveTo = await getMoveTo();

    expect(MoveTo?.prototype.registerTrigger).toBeDefined();
  });

  it('should handle unexpected error', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    // getFakeSentence() not allowed to be called for when using jest.mock()
    const unexpectedError = 'unexpected error';

    jest.mock('moveto', () => {
      throw unexpectedError;
    });

    const MoveTo = await getMoveTo();

    expect(MoveTo).toBeUndefined();
    expect(consoleErrorMock).toBeCalledTimes(1);
    expect(consoleErrorMock).toBeCalledWith(
      'Error on MoveTo import:',
      unexpectedError
    );
  });
});
