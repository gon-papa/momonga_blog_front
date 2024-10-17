interface LoginCredentials {
  user_id: string;
  password: string;
}

interface LoginErrors {
  zod_errors: ZodErrors;
  message: Message;
}

export interface LoginState extends LoginCredentials, LoginErrors {}

export const initialState: LoginState = {
  user_id: "",
  password: "",
  zod_errors: {},
  message: {
    id: "",
    text: "",
  },
} as const;

export type ZodErrors = {
  user_id?: string[];
  password?: string[];
};

export type Message = {
  id?: string;
  text?: string;
};
