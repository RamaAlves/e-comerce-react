import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./RegisterSuccess.module.scss";
import { useEffect, useState } from "react";
export function RegisterSuccess() {
  const [darkMode] = useTheme();
  const [count, setCount] = useState<number>(5);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state;
  /* useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }); */
  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <section>
        <p>
          Usuario creado con exito! Ya puede iniciar sesion con {data?.name}
        </p>
        <p>
          Por favor{" "}
          <strong>
            <Link to="/login">inicie sesion</Link>
          </strong>{" "}
          para comenzar o aguarde y en <strong>{count}</strong> segundos será
          redirigido a la pagina de logueo
        </p>
      </section>
    </main>
  );
}
