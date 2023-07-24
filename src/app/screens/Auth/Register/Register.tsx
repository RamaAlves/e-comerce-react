import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { useTheme } from "../../../hooks/useTheme";
import { useMutation } from "react-query";
import { API_USERS } from "../../../constants/urlsAPI";
import { CreateUserData } from "../../../interfaces/interfaces";
import { EMAIL_REGEXP } from "../../../constants/regexConstants";

export function Register() {
  const {darkMode} = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  // validaciones
  const [passwordLength, setPasswordLength] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(true);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(true);
  /* const [complete, setComplete] = useState<boolean>(false); */

  //expresion regular para mails
  const emailRegexp = EMAIL_REGEXP;

  //hooks
  const navigate = useNavigate();

  const createUser = useMutation(
    async (data: CreateUserData) => {
      const res = await fetch(API_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log(json);
      return json;
    },
    {
      onSuccess: (data) => {
        navigate("/register/success", { state: { data } });
      },
    }
  );
  //  function handleChange(evt) {
  //   /*
  //     evt.target es el elemento que ejecuto el evento
  //     name identifica el input y value describe el valor actual
  //   */
  //   const { target } = evt;
  //   const { name, value } = target;

  //   /*
  //     Este snippet:
  //     1. Clona el estado actual
  //     2. Reemplaza solo el valor del
  //        input que ejecutó el evento
  //   */
  //   const newValues = {
  //     ...values,
  //     [name]: value,
  //   };
  async function handleBlurEmail() {
    let data = { email: email };
    const hasError = !emailRegexp.test(email);
    setErrorEmail(hasError);
    const available = await fetch(
      "https://api.escuelajs.co/api/v1/users/is-available",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await available.json();

    setAvailable(!res?.isAvailable); //revisar xq no funciona y quitar la negacion
  }
  function handleBlurPassword() {
    if (password.length < 4) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }
  function handleBlurPassword2() {
    if (password === password2) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }
  /* function handleCheckComplete() {
    if (
      name.length > 0 &&
      email.length > 0 &&
      !passwordLength &&
      checkPassword &&
      available &&
      !errorEmail
    ) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  } */

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!errorEmail && available && checkPassword) {
      const newUser = {
        name: name,
        email: email,
        password: password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      };

      createUser.mutate(newUser);
    }
    /* const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;

    const newUser: CreateUserData = { email, password };
    */
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
        /* onChange={handleCheckComplete} */
        onSubmit={handleSubmit}
      >
        <label htmlFor="inputName">
          Name:{" "}
          <input
            type="text"
            name="name"
            id="inputName"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </label>
        <label htmlFor="inputEmail">
          Email:{" "}
          <input
            type="email"
            name="email"
            id="inputEmail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={handleBlurEmail}
            aria-errormessage="emailErrorID"
            aria-invalid={!available || errorEmail}
            required
          />
          <small
            id="msg-exist-email-ID"
            aria-live="assertive"
            style={{ visibility: !available ? "visible" : "hidden" }}
          >
            This email is already registered
          </small>
          <small
            id="msg-error-email-ID"
            aria-live="assertive"
            style={{ visibility: errorEmail ? "visible" : "hidden" }}
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={handleBlurPassword}
            aria-errormessage="passwordLengthErrorID"
            aria-invalid={passwordLength}
            required
          />
          <small
            id="msg-error-password-length-ID"
            aria-live="assertive"
            style={{ visibility: passwordLength ? "visible" : "hidden" }}
          >
            Password must contain at least 4 characters.
          </small>
        </label>
        <label htmlFor="inputPassword2">
          Repeat password:{" "}
          <input
            type="password"
            name="password2"
            id="inputPassword2"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            onBlur={handleBlurPassword2}
            aria-errormessage="passwordErrorID"
            aria-invalid={!checkPassword}
            required
          />
          <small
            id="msg-error-password-ID"
            aria-live="assertive"
            style={{ visibility: !checkPassword ? "visible" : "hidden" }}
          >
            Passwords do not mutch.
          </small>
        </label>
        <button
          disabled={
            !(
              name.length > 0 &&
              !passwordLength &&
              checkPassword &&
              available &&
              !errorEmail
            )
          }
          type="submit"
          className={styles.btnRegister}
        >
          Register
        </button>
        {" or "}
        <Link to="/login">Login</Link>
      </form>
    </main>
  );
}
