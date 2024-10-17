"use client";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./login_service";
import { initialState } from "./type";
import { useEffect, useState } from "react";
import MessageBar from "../components/MessageBar";

export default function Login() {
  const [state, dispatch] = useFormState(loginAction, initialState);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (state.message.id !== "") {
      setShowMessage(true);
    }
  }, [state.message]);

  return (
    <>
      {state.message && showMessage && (
        <MessageBar
          message={state.message.text?.toString() ?? ""}
          type={"error"} // 必要に応じて type を設定
          onClose={() => {
            setShowMessage(false);
          }}
        />
      )}
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          <form action={dispatch} className="mt-8 space-y-6">
            <div className="relative">
              <label
                htmlFor="id"
                className="absolute -top-3 left-3 px-1 bg-white text-sm text-gray-600"
              >
                ID
              </label>
              <input
                id="user_id"
                name="user_id"
                type="text"
                autoComplete="user_id"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-red-500 mt-2 mx-1">
                {state.zod_errors.user_id && state.zod_errors.user_id[0]}
              </p>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-3 left-3 px-1 bg-white text-sm text-gray-600"
              >
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-red-500 mt-2 mx-1">
                {state.zod_errors.password && state.zod_errors.password[0]}
              </p>
            </div>

            <div>
              <SubmitBtn />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        disabled={pending}
      >
        {pending ? <LoadingSpiner /> : "ログイン"}
      </button>
    </>
  );
}

function LoadingSpiner() {
  return (
    <>
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="animate-spin h-6 w-6 border-4 border-violet-700 rounded-full border-t-transparent"></div>
      </div>
    </>
  );
}
