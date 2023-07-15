import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseTheme } from "../../../hooks/UseTheme";
import styles from "./Login.module.scss";
import { UserLoginData } from "../../../interfaces/interfaces";
import { useMutation } from "react-query";
import { UseAuth } from "../../../hooks/UseAuth";
import { API_AUTH } from "../../../constants/urlsAPI";

export function Login() {
  const [darkMode] = UseTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = UseAuth();
  const from = location.state?.from?.pathname || "/";

  const signin = useMutation(
    async (data: UserLoginData) => {
      const res = await fetch(API_AUTH+"/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    {
      onSuccess: (data) => {
        const userData = { access_token: data?.access_token };
        
        auth.signin(userData, () => {
          navigate(from, { replace: true });
        });
      },
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
      
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const newUser: UserLoginData = { email, password };

    signin.mutate(newUser);
  }

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="inputEmail">
          <input type="email" name="email" id="inputEmail" />
        </label>
        <label htmlFor="inputPassword">
          <input type="password" name="password" id="inputPassword" />
        </label>
        <button type="submit" className={styles.btnLogin}>
          Login
        </button>
        <Link to="">Crear usuario</Link>
      </form>
    </main>
  );
}
