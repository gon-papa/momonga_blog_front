export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("momongaBlogAccessToken", token);
  }
};

export const saveRefreshToken = (refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("momongaBlogRefreshToken", refreshToken);
  }
};

export const getTokens = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("momongaBlogAccessToken");
    const refreshToken = localStorage.getItem("momongaBlogRefreshToken");
    return { token, refreshToken };
  }
  return { token: null, refreshToken: null };
};
