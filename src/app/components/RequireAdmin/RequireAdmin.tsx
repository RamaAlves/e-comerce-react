/* import { Navigate, useLocation, useNavigate } from "react-router-dom";
 *//* import { useAuth } from "../../hooks/useAuth"; */
import { Outlet } from "react-router-dom";
/* import { ChildrenType } from "../../interfaces/interfaces"; */
/* import { useUser } from "../../hooks/useUser";
import { useEffect } from "react"; */

export function RequireAdmin(/* { children }: ChildrenType */) {
  /* const { user } = useUser();
  const location = useLocation();
  const navigator =useNavigate()  */

  /* useEffect(() => {
    if (user?.role != "admin") {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      navigator("/login", {state:{ from: location }, replace:true});
    }
  },[user]); */
  /* if (user?.role != "admin") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  } */
  return <Outlet/>;
}
