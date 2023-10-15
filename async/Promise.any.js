/**
 * Custom Promise.any function
 * @param {*} iterable
 * @returns Promise
 *
 * Promise.any
 * - Takes iterable as input
 * - Returns a single promise, as soon as any element in iterable fulfills
 * - If no iterable element fulfills, returns a rejected promise with AggregateError
 * - AggregateError is used when serveral errors need to be wrapped in a single error
 *
 * Edge Cases
 * - Make sure array is not empty
 * - The array can also contain non-promise elements
 */
function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      reject(new AggregateError([]));
    }

    let pending = iterable.length;
    const errors = new Array(iterable.length);

    // iterable.forEach((item, index) =>
    //   Promise.resolve(item).then(
    //     (value) => {
    //       resolve(value);
    //     },
    //     (reason) => {
    //       errors[index] = reason;
    //       pending--;

    //       if (pending === 0) {
    //         reject(new AggregateError(errors));
    //       }
    //     }
    //   )
    // );

    iterable.forEach(async (item, index) => {
      try {
        const val = await item;
        resolve(val);
      } catch (err) {
        errors[index] = err;
        pending--;

        if (pending === 0) {
          rej(new AggregateError(errors));
        }
      }
    });
  });
}
