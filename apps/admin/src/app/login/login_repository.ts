import { Client, createClient } from "@hey-api/client-fetch";
import { login, LoginRequest, LoginResponse } from "@repo/api";
import { Failure, PromiseResult, Success } from "../../utils/result";
import { AuthError, InternalServerError } from "../../utils/error/error";

const loginFeatch = (request: Request) => {
  return fetch(request, {
    next: {
      revalidate: false,
    },
  });
};

const client: Client = createClient({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginFetch = async (
  data: LoginRequest
): PromiseResult<LoginResponse, Error> => {
  try {
    const res = await login({
      client,
      body: data,
    });

    if (res.error) {
      if (res.error.status !== 200) {
        const message: string = res.error?.error.message ?? "unknown error";
        const failed = new AuthError(message);
        return new Failure(failed);
      }
      let failed = new InternalServerError("Internal server error");
      throw new InternalServerError("Internal server error");
    }

    if (res.data) {
      return new Success(res.data);
    }

    return new Failure(new InternalServerError("No data received"));
  } catch (e) {
    console.log(e);
    return new Failure(new Error("Unknown error"));
  }
};
