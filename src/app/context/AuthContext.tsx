import React, { useEffect } from "react";
import {
  AuthContextType,
  ChildrenType,
  UserLoginDataResponse,
} from "../interfaces/interfaces";
import { ACCESS_TOKEN } from "../constants/localStorageConstants";
import { useMutation } from "react-query";
import { API_AUTH } from "../constants/urlsAPI";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
/* import { useUser } from "../hooks/useUser";
import { useQuery } from "react-query";
import { QUERY_KEY_USER_AUTH } from "../constants/queryConstants";
import { API_AUTH } from "../constants/urlsAPI"; */

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: ChildrenType) {
  
  const [accessToken, setAccessToken] =
    React.useState<UserLoginDataResponse | null>(null);
  /* const user = useUser(); */
  const {updateUser} = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN)!);
    if (token) {
      setAccessToken(token);
      checkUser.mutate(token);
    }
  }, []);
    
  const checkUser = useMutation(
    async (data: UserLoginDataResponse) => {
      console.log(data)
      const res = await fetch(API_AUTH + "/profile", {
        method: "GET",
        headers: { "Authorization": `Bearer ${data?.access_token}` },
      });
      const json = await res.json();
      if (json.statusCode === 401) {
        throw new Error("Invalid access token");
      }
      return json;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        updateUser(data)
      },
      onError: (error) => {
        console.error("Try login again. " + error);
        navigate("/error/login");
      },
    }
  );

  const signin = (
    accessToken: UserLoginDataResponse,
    callback: VoidFunction
  ) => {
    setAccessToken(accessToken);
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
    checkUser.mutate(accessToken)
    callback()
  };

  const signout = (callback: VoidFunction) => {
    setAccessToken(null);
    localStorage.removeItem(ACCESS_TOKEN);
    updateUser(null)
    return callback();
  };

  const value = { accessToken, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
