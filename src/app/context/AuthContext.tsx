import React from "react";
import { ACCESS_TOKEN } from "../constants/localStorageConstants";
import { AuthContextType, ChildrenType, UserLoginDataResponse } from "../interfaces/interfaces";



export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: ChildrenType) {
  const [user, setUser] = React.useState<UserLoginDataResponse | null>(null);

  //const foo = JSON.parse(localStorage.getItem(ACCESS_TOKEN));

  const signin = (newUser: UserLoginDataResponse, callback: VoidFunction) => {
    setUser(newUser);
    /* localStorage.setItem(
      ACCESS_TOKEN,
      JSON.stringify({ newUser })
    ); */
    return callback();
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    // localStorage.removeItem(ACCESS_TOKEN);
    return callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


