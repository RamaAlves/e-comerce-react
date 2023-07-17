import React, { useEffect } from "react";
import {
  AuthContextType,
  ChildrenType,
  UserLoginDataResponse,
} from "../interfaces/interfaces";
import { ACCESS_TOKEN } from "../constants/localStorageConstants";
/* import { useUser } from "../hooks/useUser";
import { useQuery } from "react-query";
import { QUERY_KEY_USER_AUTH } from "../constants/queryConstants";
import { API_AUTH } from "../constants/urlsAPI"; */

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: ChildrenType) {
  
  const [accessToken, setAccessToken] =
    React.useState<UserLoginDataResponse | null>(null);
  /* const user = useUser(); */
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN)!);
    if (token) {
      setAccessToken(token);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  }, [accessToken]);
    

  const signin = (
    accessToken: UserLoginDataResponse,
    callback: VoidFunction
  ) => {
    setAccessToken(accessToken);

    callback()
  };

  const signout = (callback: VoidFunction) => {
    setAccessToken(null);
    localStorage.removeItem(ACCESS_TOKEN);
    return callback();
  };

  const value = { accessToken, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
