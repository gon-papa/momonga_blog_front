"use client";

import { useLoginForm, onSubmit } from "./login_service";

export default function Login() {
  const { register, formState, handleSubmit } = useLoginForm();

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="relative">
              <label
                htmlFor="id"
                className="absolute -top-3 left-3 px-1 bg-white text-sm text-gray-600"
              >
                ID
              </label>
              <input
                {...register("user_id")}
                id="user_id"
                name="user_id"
                type="text"
                autoComplete="user_id"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-red-500 mt-2 mx-1">
                {formState.errors.user_id && formState.errors.user_id.message}
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
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-red-500 mt-2 mx-1">
                {formState.errors.password && formState.errors.password.message}
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
