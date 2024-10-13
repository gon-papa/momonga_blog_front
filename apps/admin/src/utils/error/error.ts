interface IError {
  message: string;
}

export class InternalServerError extends Error implements IError {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
