import { createContext, useState } from "react";
import { ChildrenType, UserDataResponse } from "../interfaces/interfaces";
/* import { useAuth } from "../hooks/useAuth";
import { useQuery } from "react-query";
import { QUERY_KEY_USER_AUTH } from "../constants/queryConstants";
import { API_AUTH } from "../constants/urlsAPI"; */

export const UserContext = createContext<any>(null!);

export function UserProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  /* const auth = useAuth(); */
  /* const fetchUserAuth = async () => {
    console.log(auth.accessToken?.access_token);
    const res = await fetch(API_AUTH + "/profile", {
      headers: { Authorization: `Bearer ${auth.accessToken?.access_token}` },
    });
    return res.json();
  };

  const {
    data: userData,
    status: userDataStatus,
    error: userDataError,
  } = useQuery([QUERY_KEY_USER_AUTH, auth.accessToken], fetchUserAuth); */

  /* const updateUser = (userData:any) => {
    setUser(userData);
  }; */

  const value = [user, setUser];
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
