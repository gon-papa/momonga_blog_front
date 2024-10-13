export type Result<T, E extends Error> = Success<T> | Failure<E>;

export type PromiseResult<T, E extends Error> = Promise<Result<T, E>>;

interface ResultInterface<T, E extends Error> {
  isSuccess(): this is Success<T>;
  isFailure(): this is Failure<E>;
  getValue(): T | E;
}

export class Success<T> implements ResultInterface<T, never> {
  constructor(readonly value: T) {}

  isSuccess(): this is Success<T> {
    return true;
  }

  isFailure(): this is Failure<never> {
    return false;
  }

  getValue(): T {
    return this.value;
  }
}

export class Failure<E extends Error> implements ResultInterface<never, E> {
  constructor(readonly error: E) {}

  isSuccess(): this is Success<never> {
    return false;
  }

  isFailure(): this is Failure<E> {
    return true;
  }

  getValue(): E {
    return this.error;
  }
}
