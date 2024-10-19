import { Client, createClient } from "@hey-api/client-fetch";
import { login, LoginRequest, LoginResponse } from "@repo/api";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/error/error";

const loginFeatch = (request: Request) => {
  return fetch(request, {
    cache: "no-store",
    credentials: "include",
  });
};

const client: Client = createClient({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  fetch: loginFeatch,
});

export type LoginResponseWrapper = {
  data: LoginResponse | undefined;
  error: Error | null;
  result: boolean;
};

export const loginPost = async (
  data: LoginRequest
): Promise<LoginResponseWrapper> => {
  try {
    const result = await login({
      client,
      body: data,
    });
    const err = checkStatus({
      httpStatus: result.response.status,
      errMessage: result.error?.error.message ?? "unknown error",
    });
    if (err) {
      throw err;
    }

    if (result.data === undefined) {
      return {
        data: undefined,
        error: new Error("data is undefined"),
        result: false,
      };
    }
    return {
      data: result.data,
      error: null,
      result: true,
    };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return {
        data: undefined,
        error: e,
        result: false,
      };
    }

    return {
      data: undefined,
      error: new Error("unknown error"),
      result: false,
    };
  }
};

function checkStatus({
  httpStatus,
  errMessage,
}: {
  httpStatus: number;
  errMessage: string;
}): Error | null {
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 400:
        console.log(errMessage);
        return new BadRequestError("Bad Request");
      case 401:
        console.log(errMessage);
        return new UnauthorizedError("Unauthorized");
      case 403:
        console.log(errMessage);
        return new ForbiddenError("Forbidden");
      case 404:
        console.log(errMessage);
        return new NotFoundError("Not Found");
      default:
        console.log(errMessage);
        return new Error(`Client Error: ${httpStatus}`);
    }
  } else if (httpStatus >= 500) {
    console.log(errMessage);
    return new InternalServerError(`Server Error: ${httpStatus}`);
  }

  return null;
}
