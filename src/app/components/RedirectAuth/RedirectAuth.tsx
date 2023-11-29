import { Navigate, Outlet } from "react-router-dom";
/* import { useAuth } from "../../hooks/useAuth"; */
/* import { ChildrenType } from "../../interfaces/interfaces"; */
import { useUser } from "../../hooks/useUser";

export function RedirectAuth(/* { children }: ChildrenType */) {
  const {user} = useUser();

  if (user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" replace />;
  }

  return <Outlet/>;
}
