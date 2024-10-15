interface IError {
  message: string;
}

export class InternalServerError extends Error implements IError {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnknownError extends Error {
  constructor() {
    super("Unknown error");
    this.name = "Unknown";
  }
}
