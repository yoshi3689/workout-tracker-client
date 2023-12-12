export const COMMON_PREFIX = "/api";

export const U_R_PREFIX = "/user";
export const R_R_PREFIX = "/routines";
export const A_R_PREFIX = "/auth";

export const PATHNAMES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  USER_HOME: "/dashboard/:username",
  USER_EDIT_ADD_LOG: "/dashboard/:username/log",
  EMAIL_VERIFY: "/verify-email/:usernameEncoded/",
};

export const defineUserPath = (username: string, path: string): string => {
  return path.replace(":username", username);
}