import { useEffect, useState } from "react";
import { USER_BY_EMAIL } from "../graphql/queries/users";
import { apiAdmin } from "../helpers/Auth8Base";
import { IUserSigned } from "../interfaces/IUser";
import { useErrorHandler } from "./useErrorHandler";
import { useAuthStore } from "../store/AuthStore";

export const useUserLogged = () => {
  const { validateError } = useErrorHandler();
  const { signin } = useAuthStore();

  const saveUserLogged = async (email: string) => {
    try {
      const response = await apiAdmin.query(USER_BY_EMAIL, { email });
      if (response.errors) throw response;
      if (response.data) signin(response.data.user);
    } catch (error) {
      validateError(error);
    }
  };

  return {
    saveUserLogged,
  };
};
