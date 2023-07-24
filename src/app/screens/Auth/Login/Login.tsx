import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./Login.module.scss";
import { UserLoginData } from "../../../interfaces/interfaces";
import { useMutation } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import { API_AUTH } from "../../../constants/urlsAPI"; /* 
import { QUERY_KEY_USER_AUTH } from "../../../constants/queryConstants"; */
import { useState } from "react";
import { EMAIL_REGEXP } from "../../../constants/regexConstants";

export function Login() {
  //contexts
  const {darkMode} = useTheme();
  const auth = useAuth();

  //router
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //regexp
  const emailRegexp = EMAIL_REGEXP;

  //states
  const [errors, setErrors] = useState({
    hasErrorPassword: true,
    hasErrorEmail: false,
    hasErrorMailLength:true
  });/* 
  const [active, setActive] = useState<boolean>(false); */

  const signin = useMutation(
    async (data: UserLoginData) => {
      const res = await fetch(API_AUTH + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.statusCode === 401) {
        throw new Error("Invalid user and password");
      }
      return json;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        const accessToken = { access_token: data?.access_token };
        auth.signin(accessToken, () => {
          navigate(from, { replace: true });
        });
      },
      onError: (error) => {
        console.error("Try login again. " + error);
        navigate("/error/login");
      },
    }
  );

  /* function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { name, value } = target;

    const newerrors = {
      ...errors,
      [name]: value,
    };

    setErrors(newerrors);
  } */
  function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
    const { target } = e;
    const { value: mail } = target;
    const hasErrorEmail = !emailRegexp.test(mail);
    const hasErrorMailLength = mail.length<1
    setErrors((prevErrors) => ({ ...prevErrors, hasErrorEmail, hasErrorMailLength }));
    /* activeButton(); */
  }

  function handleBlurPassword(e: React.FocusEvent<HTMLInputElement>) {
    const { target } = e;
    const { value: password } = target;
    if (password.length < 4) {
      const hasErrorPassword = true;
      setErrors((prevErrors) => ({ ...prevErrors, hasErrorPassword }));
    } else {
      const hasErrorPassword = false;
      setErrors((prevErrors) => ({ ...prevErrors, hasErrorPassword }));
    }
    /* activeButton(); */
  }

  /* function activeButton() {
    if (errors.email.length > 1 && errors.password.length > 2) {
      if (errors.hasErrorEmail || errors.hasErrorPassword) {
        setActive(false);
      } else {
        setActive(true);
      }
    } else {
      setActive(false);
    }
  }
 */
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
          Email:{" "}
          <input
            type="email"
            name="email"
            id="inputEmail"
            /*             value={errors.email} */
            /* onChange={handleChange} */
            onBlur={handleBlurEmail}
            aria-errormessage="emailErrorID"
            aria-invalid={errors.hasErrorEmail}
            required
            />
          <small
            id="msg-exist-email-ID"
            aria-live="assertive"
            style={{ visibility: errors.hasErrorEmail ? "visible" : "hidden" }}
            >
            Please enter a valid email
          </small>
        </label>
        <label htmlFor="inputPassword">
          Password:{" "}
          <input
            type="password"
            name="password"
            id="inputPassword"
            /*             value={errors.password}
            onChange={handleChange} */
            onBlur={handleBlurPassword}
            aria-errormessage="passwordLengthErrorID"
            aria-invalid={errors.hasErrorPassword}
            required
            />
          <small
            id="msg-error-password-length-ID"
            aria-live="assertive"
            style={{
              visibility: (errors.hasErrorPassword&&errors.hasErrorMailLength&&errors.hasErrorEmail) ? "visible" : "hidden",
            }}
          >
            Password must contain at least 4 characters.
          </small>
        </label>
        <button
          disabled={ errors.hasErrorMailLength||errors.hasErrorEmail || errors.hasErrorPassword}
          type="submit"
          className={styles.btnLogin}
        >
          Login
        </button>
        <p>or</p>
        <Link to="/register">Register</Link>
      </form>
    </main>
  );
}
