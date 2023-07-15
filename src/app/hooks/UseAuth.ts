import {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

export function UseAuth() {
  return useContext(AuthContext);
}
