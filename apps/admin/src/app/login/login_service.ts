import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  loginValidation,
} from "../../utils/validation/login_validation";
import { loginFetch } from "./login_repository";
import { loggedInSaveTokens } from "../../utils/auth/auth_service";
import { LoginResponse } from "@repo/api";
import { redirect } from "next/navigation";

export function useLoginForm() {
  const { register, handleSubmit, setValue, formState, control, watch } =
    useForm<loginFormSchema>({
      resolver: zodResolver(loginValidation),
      defaultValues: {
        user_id: "",
        password: "",
      },
    });

  return {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState,
  };
}

export async function onSubmit(data: loginFormSchema) {
  const res = await loginFetch(data);
  if (res.error) {
    failure(res.error);
    return;
  }

  if (res.data) {
    success(res.data);
  }

  return;
}

const success = (res: LoginResponse) => {
  if (res.data) {
    const token = res.data.token;
    const refreshToken = res.data.refreshToken;

    loggedInSaveTokens({ token, refreshToken });
    console.log("login success");
    window.location.href = "/";
  }
};

const failure = (error: Error) => {
  console.error(error);
};
