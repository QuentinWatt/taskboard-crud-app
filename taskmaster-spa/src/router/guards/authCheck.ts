import { setBearerToken } from "../../helpers/auth/bearerTokenHelper";
import { findTokenCookie } from "../../helpers/auth/cookieHelper";
import { useAuthStore } from "../../store/useAuthStore";

export const authCheck = () => {
  const store = useAuthStore();
  if (store.isLoggedIn) {
    return;
  }

  const token = findTokenCookie();
  if (token) {
    store.setToken(token);
    setBearerToken(token);
    store.getUser();
  } else {
    return "/login";
  }
};
