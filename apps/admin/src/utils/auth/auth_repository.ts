import { cookies } from "next/headers";

const cookieOptions = {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24,
};

export const saveToken = (token: string) => {
  const cookieStore = cookies();
  cookieStore.set("token", token, cookieOptions);
};

export const saveRefreshToken = (refreshToken: string) => {
  const cookieStore = cookies();
  cookieStore.set("refreshToken", refreshToken, cookieOptions);
};

export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token");
};

export const getRefreshToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("refreshToken");
};

export const getTokens = () => {
  return {
    token: getToken(),
    refreshToken: getRefreshToken(),
  };
};

export const removeToken = () => {
  const cookieStore = cookies();
  cookieStore.delete("token");
};

export const removeRefreshToken = () => {
  const cookieStore = cookies();
  cookieStore.delete("refreshToken");
};

export const removeTokens = () => {
  removeToken();
  removeRefreshToken();
};
