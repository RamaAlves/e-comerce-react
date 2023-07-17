import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "react-query";
import { API_AUTH } from "../../constants/urlsAPI";
import { QUERY_KEY_USER_DATA } from "../../constants/queryConstants";
/* import { useUser } from "../../hooks/useUser"; */
import { Loader } from "../UI/Loader/Loader";

export function AuthStatus(props: any) {
  const auth = useAuth();
  /* const user = useUser(); */
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const res = await fetch(API_AUTH + "/profile", {
      headers: { Authorization: `Bearer ${auth.accessToken?.access_token}` },
    });
    console.log(res);
    return res.json();
  };

  /* const updateUser = (data) => {
    console.log(data);
    user.setUser(data);
  }; */

  const {
    data: userData,
    status: userStatus,
    /* error: userError, */
  } = useQuery([QUERY_KEY_USER_DATA, auth], fetchUserData, {
    enabled: !!auth.accessToken?.access_token,
  });

  if (!auth.accessToken) {
    return (
      <Link
        to="/login"
        onClick={() => {
          props.onSetExpandedMenu(!props.onExpandedMenu);
        }}
      >
        Login
      </Link>
    );
  }
  if (userStatus === "loading") {
    return <Loader />;
  }
  if (userData) {
    return (
      <p>
        Welcome {userData.name}!{" "}
        <button
          onClick={() => {
            props.onSetExpandedMenu(!props.onExpandedMenu);
            auth.signout(() => navigate("/"));
          }}
        >
          Logout
        </button>
      </p>
    );
  }
}
