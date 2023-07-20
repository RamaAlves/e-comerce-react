import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { useUser } from "../../hooks/useUser";

export function AuthStatus(props: any) {
  const auth = useAuth();
  const {user} = useUser();
  const navigate = useNavigate();

  if (!user) {
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

    return (
      <p>
        Welcome {user.name}!{" "}
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
