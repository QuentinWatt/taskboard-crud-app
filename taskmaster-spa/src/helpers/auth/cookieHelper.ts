export const storeTokenCookie = (token: string) => {
  document.cookie = `token=${token}; Secure; path=/`;
};

export const clearTokenCookie = () => {
  document.cookie = `token=; Secure; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const findTokenCookie = () => {
  const token =
    document.cookie
      ?.split(";")
      ?.filter((cookie) => cookie.includes("token="))[0]
      ?.split("=")[1] ?? null;
  return token;
};
