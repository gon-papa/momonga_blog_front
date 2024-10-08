import { z } from "zod";

export const loginValidation = z.object({
  id: z
    .string({ message: "idは4文字以上である必要があります。" })
    .min(4, "idは4文字以上である必要があります。")
    .max(20, "idは20文字以下である必要があります。"),
  password: z
    .string({ message: "パスワードは8文字以上である必要があります。" })
    .min(8, "パスワードは8文字以上である必要があります。")
    .max(20, "パスワードは20文字以下である必要があります。"),
});

export type loginFormSchema = z.infer<typeof loginValidation>;
