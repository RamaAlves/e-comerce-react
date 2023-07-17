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
  const [darkMode] = useTheme();
  const auth = useAuth();

  //router
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //regexp
  const emailRegexp = EMAIL_REGEXP;

  //states
  const [values, setValues] = useState({
    email: "",
    password: "",
    hasErrorPassword: false,
    hasErrorEmail: false,
  });

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }
  function handleBlurEmail(e: React.FocusEvent<HTMLInputElement>) {
    const { target } = e;
    const { value: mail } = target;
    const hasErrorEmail = !emailRegexp.test(mail);
    setValues((prevValues) => ({ ...prevValues, hasErrorEmail }));
  }

  function handleBlurPassword(e: React.FocusEvent<HTMLInputElement>) {
    const { target } = e;
    const { value: password } = target;
    if (password.length < 4) {
      const hasErrorPassword = true;
      setValues((prevValues) => ({ ...prevValues, hasErrorPassword }));
    } else {
      const hasErrorPassword = false;
      setValues((prevValues) => ({ ...prevValues, hasErrorPassword }));
    }
  }
  

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
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <label htmlFor="inputEmail">
          Email:{" "}
          <input
            type="email"
            name="email"
            id="inputEmail"
            onChange={handleChange}
            onBlur={handleBlurEmail}
            aria-errormessage="emailErrorID"
            aria-invalid={values.hasErrorEmail}
          />
          <small
            id="msg-exist-email-ID"
            aria-live="assertive"
            style={{ visibility: values.hasErrorEmail ? "visible" : "hidden" }}
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
            onChange={handleChange}
            onBlur={handleBlurPassword}
            aria-errormessage="passwordLengthErrorID"
            aria-invalid={values.hasErrorPassword}
          />
          <small
            id="msg-error-password-length-ID"
            aria-live="assertive"
            style={{
              visibility: values.hasErrorPassword ? "visible" : "hidden",
            }}
          >
            Password must contain at least 4 characters.
          </small>
        </label>
        <button
          disabled={values.hasErrorEmail || values.hasErrorPassword}
          type="submit"
          className={styles.btnLogin}
        >
          Login
        </button>
        <Link to="/register">Register</Link>
      </form>
    </main>
  );
}
