import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  loginValidation,
} from "../../utils/validation/login_validation";

export function useLoginForm() {
  const { register, handleSubmit, setValue, formState, control, watch } =
    useForm<loginFormSchema>({
      resolver: zodResolver(loginValidation),
      defaultValues: {
        id: "",
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

// TODO サーバーアクション定義
export const onSubmitFormAction: SubmitHandler<loginFormSchema> = async (
  data
) => {
  console.log(data);
};
