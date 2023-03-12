import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import axios from 'axios';
import { getFakeEmail, getFakeUuid } from '../../lib/test-helpers';
import { FetchState } from '../../lib/types';
import * as locationHelpers from '../../lib/location';
import {
  useSubmitSubscribeRequest,
  useUnsubscribe,
  useVerifySubscription,
} from '../../lib/api-hooks';

describe('api hooks utilities', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('useSubmitSubscribeRequest()', () => {
    const renderApiHook = () => renderHook(() => useSubmitSubscribeRequest());

    it('should return initial values', () => {
      const hook = renderApiHook();
      const [fetchState, submitSubscribeRequest] = hook.result.current;

      expect(fetchState).toBe(FetchState.DEFAULT);
      expect(typeof submitSubscribeRequest).toBe('function');
    });

    it('should have expected state on api call', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue(null);

      const hook = renderApiHook();
      const submitSubscribeRequest = hook.result.current[1];

      const promiseAct = act(async () => {
        await submitSubscribeRequest(getFakeEmail());
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.LOADING);

      await promiseAct;
    });

    it('should have expected state, endpoint and request body on api success', async () => {
      const axiosPostSpy = jest.spyOn(axios, 'post').mockResolvedValue(null);

      const hook = renderApiHook();
      const submitSubscribeRequest = hook.result.current[1];
      const email = getFakeEmail();

      await act(async () => {
        await submitSubscribeRequest(email);
      });

      const [fetchState] = hook.result.current;
      const endpointRegExp = new RegExp('/subscription-requests$');

      expect(fetchState).toBe(FetchState.SUCCESS);
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(axiosPostSpy).toBeCalledWith(
        expect.stringMatching(endpointRegExp),
        {
          contact: email,
          contactMode: 'email',
          topics: ['new-post'],
        }
      );
    });

    it('should have expected state on api error', async () => {
      jest.spyOn(axios, 'post').mockRejectedValue(null);

      const hook = renderApiHook();
      const submitSubscribeRequest = hook.result.current[1];

      await act(async () => {
        await submitSubscribeRequest(getFakeEmail());
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.ERROR);
    });
  });

  describe('useVerifySubscription()', () => {
    const renderApiHook = () => renderHook(() => useVerifySubscription());

    it('should return initial values', () => {
      const hook = renderApiHook();
      const [fetchState, verifySubscription] = hook.result.current;

      expect(fetchState).toBe(FetchState.DEFAULT);
      expect(typeof verifySubscription).toBe('function');
    });

    it('should have expected state on api not found (1)', () => {
      const hook = renderApiHook();
      const verifySubscription = hook.result.current[1];

      act(() => {
        verifySubscription();
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.NOT_FOUND);
    });

    it('should have expected state on api call', async () => {
      jest
        .spyOn(locationHelpers, 'getSearchParams')
        .mockReturnValue(getFakeUuid());
      jest.spyOn(axios, 'post').mockResolvedValue(null);

      const hook = renderApiHook();
      const verifySubscription = hook.result.current[1];

      const promiseAct = act(async () => {
        await verifySubscription();
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.LOADING);

      await promiseAct;
    });

    it('should have expected state, endpoint and request body on api success', async () => {
      const subscriptionId = getFakeUuid();
      const getSearchParamsSpy = jest
        .spyOn(locationHelpers, 'getSearchParams')
        .mockReturnValue(subscriptionId);
      const axiosPostSpy = jest.spyOn(axios, 'post').mockResolvedValue(null);

      const hook = renderApiHook();
      const verifySubscription = hook.result.current[1];

      await act(async () => {
        await verifySubscription();
      });

      const [fetchState] = hook.result.current;
      const endpointRegExp = new RegExp(
        `/subscription-requests/${subscriptionId}/verify$`
      );

      expect(fetchState).toBe(FetchState.SUCCESS);
      expect(getSearchParamsSpy).toBeCalledTimes(1);
      expect(getSearchParamsSpy).toBeCalledWith('id');
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(axiosPostSpy).toBeCalledWith(
        expect.stringMatching(endpointRegExp)
      );
    });

    it('should have expected state on api error (not found)', async () => {
      jest
        .spyOn(locationHelpers, 'getSearchParams')
        .mockReturnValue(getFakeUuid());
      jest.spyOn(axios, 'post').mockRejectedValue({
        response: { status: 404 },
      });

      const hook = renderApiHook();
      const verifySubscription = hook.result.current[1];

      await act(async () => {
        await verifySubscription();
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.NOT_FOUND);
    });

    it('should have expected state on api error (unexpected)', async () => {
      jest
        .spyOn(locationHelpers, 'getSearchParams')
        .mockReturnValue(getFakeUuid());
      jest.spyOn(axios, 'post').mockRejectedValue({});

      const hook = renderApiHook();
      const verifySubscription = hook.result.current[1];

      await act(async () => {
        await verifySubscription();
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.ERROR);
    });
  });

  describe('useUnsubscribe()', () => {
    const renderApiHook = () => renderHook(() => useUnsubscribe());

    it('should return initial values', () => {
      const hook = renderApiHook();
      const [fetchState, unsubscribe] = hook.result.current;

      expect(fetchState).toBe(FetchState.DEFAULT);
      expect(typeof unsubscribe).toBe('function');
    });

    it('should have expected state on api call', async () => {
      jest.spyOn(axios, 'delete').mockResolvedValue(null);

      const hook = renderApiHook();
      const unsubscribe = hook.result.current[1];

      const promiseAct = act(async () => {
        await unsubscribe(getFakeEmail());
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.LOADING);

      await promiseAct;
    });

    it('should have expected state, endpoint and request body on api success', async () => {
      const axiosPostSpy = jest.spyOn(axios, 'delete').mockResolvedValue(null);

      const hook = renderApiHook();
      const unsubscribe = hook.result.current[1];
      const email = getFakeEmail();

      await act(async () => {
        await unsubscribe(email);
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.SUCCESS);
      expect(axiosPostSpy).toBeCalledTimes(1);
      expect(axiosPostSpy).toBeCalledWith(
        expect.stringContaining(
          `/subscriptions/contact-mode/email/topics/new-post?email=${encodeURIComponent(
            email
          )}`
        )
      );
    });

    it('should have expected state on api error', async () => {
      jest.spyOn(axios, 'delete').mockRejectedValue(null);

      const hook = renderApiHook();
      const unsubscribe = hook.result.current[1];

      await act(async () => {
        await unsubscribe(getFakeEmail());
      });

      const [fetchState] = hook.result.current;

      expect(fetchState).toBe(FetchState.ERROR);
    });
  });
});
