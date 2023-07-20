import { Link } from "react-router-dom";
import style from "./Nav.module.scss";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ThemeButton } from "../UI/ThemeButton/ThemeButton";
import { AuthStatus } from "../Auth/AuthStatus";

export function Nav() {
  const [darkMode] = useContext(ThemeContext);
  const [expandedMenu, setExpandedMenu] = useState(false);
  return (
    <nav
      className={[style.nav, darkMode ? style.darkMode : style.lightMode].join(
        " "
      )}
    >
      <Link className={style.logo} to="/">
        <img
          src={
            darkMode
              ? "/images/Logos/TiendaOnline-logos_white.png"
              : "/images/Logos/TiendaOnline-logos_black.png"
          }
          alt="logo"
        />
      </Link>

      <div className={style.containerMenu}>
        <div className={style.navbar}>
          <ul className={style.list}>
            <Link
              to="/"
              onClick={() => {
                setExpandedMenu(!expandedMenu);
              }}
            >
              <li>Inicio</li>
            </Link>
            <Link
              to="/categories"
              onClick={() => {
                setExpandedMenu(!expandedMenu);
              }}
            >
              <li>Categorias</li>
            </Link>
            <Link
              to="/products"
              onClick={() => {
                setExpandedMenu(!expandedMenu);
              }}
            >
              <li>Products</li>
            </Link>
          </ul>
          <div className={style.userOption}>
            <Link
              to="/login"
              onClick={() => {
                setExpandedMenu(!expandedMenu);
              }}
            >
              Iniciar sesion
            </Link>
            {/* <Link to="/logout">
            Cerrar Sesion
        </Link> */}
            <Link
              to="/cart-detail"
              onClick={() => {
                setExpandedMenu(!expandedMenu);
              }}
            >
              Cart
            </Link>
            <ThemeButton />
          </div>
        </div>
      </div>
      <div className={style.containerMenuMobile}>
        <button
          className={[
            style.buttonMenu,
            expandedMenu && style["buttonMenuActive"],
          ].join(" ")}
          onClick={(e) => {
            e.preventDefault();
            setExpandedMenu(!expandedMenu);
          }}
        >
          <span></span>
        </button>
      </div>
      <div
        className={[
          [expandedMenu ? style["expanded"] : style["contracted"]],
          [style.navbarMobile],
        ].join(" ")}
      >
        <div className={style.userOption}>
          {/* <Link
            to="/login"
            onClick={() => {
              setExpandedMenu(!expandedMenu);
            }}
          >
            Iniciar sesion
          </Link> */}
          <AuthStatus onSetExpandedMenu={setExpandedMenu} onExpandedMenu={expandedMenu} />
          
          <Link
            to="/cart-detail"
            onClick={() => {
              setExpandedMenu(!expandedMenu);
            }}
          >
            Cart
          </Link>
          <ThemeButton />
        </div>
        <ul className={style.list}>
          <Link
            to="/"
            onClick={() => {
              setExpandedMenu(!expandedMenu);
            }}
          >
            <li>Inicio</li>
          </Link>
          <Link
            to="/categories"
            onClick={() => {
              setExpandedMenu(!expandedMenu);
            }}
          >
            <li>Categorias</li>
          </Link>
          <Link
            to="/products"
            onClick={() => {
              setExpandedMenu(!expandedMenu);
            }}
          >
            <li>Products</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
