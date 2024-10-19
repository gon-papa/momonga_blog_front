"use server";

import {
  loginFormSchema,
  loginValidation,
} from "../../utils/validation/login_validation";
import { loginPost } from "./login_repository";
import { loggedInSaveTokens } from "../../utils/auth/auth_service";
import { LoginResponse } from "@repo/api";
import { initialState, LoginState } from "./type";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const data = {
    user_id: formData.get("user_id") as string,
    password: formData.get("password") as string,
  };

  const validationResult = validation(data.user_id, data.password);
  if (!validationResult.success) {
    return {
      ...prevState,
      zod_errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const result = await loginProcess(data);
  if (!result) {
    return {
      ...prevState,
      zod_errors: {},
      message: {
        id: uuidv4(),
        text: "ログインに失敗しました",
      },
    };
  }

  // Clear the form
  return initialState;
}

function validation(user_id: string, password: string) {
  return loginValidation.safeParse({
    user_id: user_id,
    password: password,
  });
}

export async function loginProcess(data: loginFormSchema): Promise<boolean> {
  const res = await loginPost(data);
  if (res.error) {
    failure(res.error);
    return false;
  }

  if (res.data) {
    success(res.data);
  }

  return true;
}

const success = (res: LoginResponse) => {
  if (res.data) {
    const token = res.data.token;
    const refreshToken = res.data.refreshToken;

    loggedInSaveTokens({ token, refreshToken });
    console.log("login success");
    redirect("/");
  }
};

const failure = (error: Error) => {
  console.error(error);
};
