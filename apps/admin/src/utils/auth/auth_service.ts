import { getToken, saveRefreshToken, saveToken } from "./auth_repository";

export type Tokens = {
  token: string;
  refreshToken: string;
};

export function isAutehnticated(): boolean {
  const token = getToken();
  return token !== undefined;
}

export function loggedInSaveTokens(tokens: Tokens): boolean {
  try {
    saveToken(tokens.token);
    saveRefreshToken(tokens.refreshToken);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
