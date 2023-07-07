import { Link } from "react-router-dom";
import style from "./Nav.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ThemeButton } from "../UI/ThemeButton";

export function Nav() {
  const [darkMode] = useContext(ThemeContext);

  return (
    <nav className={darkMode ? style.darkModeNav : style.nav}>
      <Link to="/">
        
      </Link>
      <ul className={style.list}>
        <Link to="/">
          <li>Inicio</li>
        </Link>
        <Link to="/categories">
          <li>Categorias</li>
        </Link>
        <Link to="/products">
          <li>Products</li>
        </Link>
      </ul>
      <div className={style.userOption}>
        <Link to="/login">
          Iniciar sesion
        </Link>
        {/* <Link to="/logout">
            Cerrar Sesion
        </Link> */}
        <Link to="/cart-detail">
          Cart
        </Link>
        <ThemeButton />
      </div>
    </nav>
  );
}
