export const REQUEST_COMMON_PREFIX = "/api";

export const REQUEST_U_R_PREFIX = "/user";
export const REQUEST_R_R_PREFIX = "/routines";
export const REQUEST_A_R_PREFIX = "/auth";

export const PATHNAMES = {
  HOME: "/",
  SIGNIN: "/signin",
  REFRESH: "/refresh",
  SIGNUP: "/signup",
  EMAIL_VERIFY: "/verify-email/:usernameEncoded/",
  PASSWORD_SEND: "/send-password",
  EMAIL_RESEND: "/resend-email",
  USER_HOME: "/dashboard/:username",
  USER_EDIT_ADD_LOG: "/dashboard/:username/log",
  USER_ACCOUNT_EDIT: "/dashboard/:username/edit-account",
};

export const defineUserPath = (username: string, path: string): string => {
  return path.replace(/:username(?:Encoded)?/, username);
}