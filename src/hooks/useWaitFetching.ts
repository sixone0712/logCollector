export const waitGenerator = async function* (): any {
  while (true) {
    const isFetching = yield;

    console.log('waitGenerator_isFetching', isFetching);

    if (isFetching) {
      yield new Promise((resolve) => {
        setTimeout(() => resolve(resolve), 100);
      });
    } else {
      return;
    }
  }
};

export const waitRequesting = async function* (): any {
  while (true) {
    const isFetching = yield;

    console.log('waitRequesting_isFetching', isFetching);

    if (!isFetching) {
      yield new Promise((resolve) => {
        setTimeout(() => resolve(resolve), 100);
      });
    } else {
      return;
    }
  }
};
