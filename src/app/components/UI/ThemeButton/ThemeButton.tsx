import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import style from "./ThemeButton.module.scss";

export function ThemeButton() {
  const [darkMode, setDarkMode] = useContext(ThemeContext);
  function changeTheme(state: boolean) {
    setDarkMode(state);
  }
  return (
    <div className={darkMode ? style.darkContainer : style.container}>
      <p>Lights:</p>
      <div className={style.interruptor}>
        <div className={style.switch}>
          <button
            className={darkMode === true ? style.offActive : style.off}
            onClick={() => {
              changeTheme(true);
            }}
          >
            OFF
          </button>
          <button
            className={darkMode === false ? style.onActive : style.on}
            onClick={() => {
              changeTheme(false);
            }}
          >
            ON
          </button>
        </div>
      </div>
    </div>
  );
}
