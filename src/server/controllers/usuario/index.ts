import * as create from "./Create";
import * as login from "./Login";

export const UserController = {
  ...create,
  ...login,
};