import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  loginValidation,
} from "../../utils/validation/login_validation";
import { loginFetch } from "./login_repository";
import { Failure } from "../../utils/result";
import { AuthError, InternalServerError } from "../../utils/error/error";
import {
  saveToken,
  saveRefreshToken,
} from "../../utils/repository/auth_repository";

type Tokens = {
  token: string;
  refreshToken: string;
};

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

  if (res instanceof Failure) {
    if (res.getValue() instanceof AuthError) {
      console.error(res.getValue().message);
      throw res.getValue();
    }

    if (res.getValue() instanceof InternalServerError) {
      console.error(res.getValue().message);
      throw res.getValue();
    }

    throw res.getValue();
  }

  const tokens: Tokens = res.getValue().data;
  saveToken(tokens.token);
  saveRefreshToken(tokens.refreshToken);
}
