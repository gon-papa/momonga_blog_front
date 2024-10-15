import { getTokens, saveRefreshToken, saveToken } from "./auth_repository";

export type Tokens = {
  token: string;
  refreshToken: string;
};

export function isAutehnticated(): boolean {
  if (typeof window !== "undefined") {
    const token = getTokens().token;
    return token !== null;
  }
  return false;
}

export function loggedInSaveTokens(tokens: Tokens): boolean {
  try {
    if (typeof window !== "undefined") {
      window.location.href = "/login";

      saveToken(tokens.token);
      saveRefreshToken(tokens.refreshToken);
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}
