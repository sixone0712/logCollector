import { MutableRefObject } from 'react';
import { MutationStatus } from 'react-query';

export const waitMutationStatus = async function* (): any {
  while (true) {
    const isFetching: MutableRefObject<MutationStatus> = yield;
    if (isFetching.current === 'idle' || isFetching.current === 'loading') {
      yield new Promise((resolve) => {
        setTimeout(() => resolve(resolve), 100);
      });
    } else {
      return;
    }
  }
};
