/**
 * Takes in the promise, execute it and return promise which
 * resolve with an array of two value where by the first value
 * is an error. If error is null, the promise resolved successfully,
 * otherwise the promise rejected. This is a handy tool for avoiding awful promise
 * chain
 */
export const resolve = <T>(promise: Promise<T>) => {
  return promise
    .then((data: T) => {
      return [null, data];
    })
    .catch(err => [err]);
};
