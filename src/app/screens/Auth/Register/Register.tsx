import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { UseTheme } from "../../../hooks/UseTheme";
import { useMutation } from "react-query";
import { API_USERS } from "../../../constants/urlsAPI";
import { CreateUserData } from "../../../interfaces/interfaces";
export function Register() {
    const [darkMode] = UseTheme();
    const createUser = useMutation(
      async (data: CreateUserData) => {
        const res = await fetch(API_USERS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        return res.json();
      },
      {
        onSuccess: (data) => {
        },
      }
    );
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let data
        createUser.mutate(data)
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
        {" or "}
        <Link to="">Login</Link>
      </form>
    </main>
  );
}
