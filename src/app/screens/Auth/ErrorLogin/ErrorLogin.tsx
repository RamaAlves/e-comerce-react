import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./ErrorLogin.module.scss"
import { useEffect, useState } from "react";

export function ErrorLogin() {
  const [darkMode] = useTheme();
  const [count, setCount] = useState<number>(5);
  const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    });
    return (
      <main
        className={[
          styles.main,
          darkMode ? styles.darkMode : styles.lightMode,
        ].join(" ")}
      >
        <p>Hubo un error al loguearse, por fravor vuelva a iniciar sesion</p>
        <p>
          Si no es redirigido en {count} segundos por favor haga click{" "}
          <Link
            to="/login"
            >
            Aquí
          </Link>
        </p>
      </main>
    );
}