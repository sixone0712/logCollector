import { MutableRefObject } from 'react';
import { MutationStatus } from 'react-query';

export const waitMutationStatus = async function* (): any {
  while (true) {
    const isFetching: MutableRefObject<boolean> = yield;
    if (isFetching.current) {
      yield new Promise((resolve) => {
        setTimeout(() => resolve(resolve), 100);
      });
    } else {
      return;
    }
  }
};
