import style from "./ThemeButton.module.scss";
import { useTheme } from "../../../hooks/useTheme";
import { DARK_MODE } from "../../../constants/localStorageConstants";

export function ThemeButton() {
  const {darkMode, setDarkMode} = useTheme();
  function changeTheme(state: boolean) {
    setDarkMode(state);
    //save themeMode in localStorage
    localStorage.setItem(DARK_MODE, JSON.stringify(state));
  }
/*   return (
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
  ); */
  return (
    <div className={style.container}>
      <div className={style.icon}>
        <p className={darkMode ? style.appear : style.disappear}>🌙</p>
        <p className={!darkMode ? style.appear : style.disappear}>☀️</p>
      </div>
      <div
        className={[
          darkMode ? style.darkTheme : style.lightTheme,
          style.containerInterruptor,
        ].join(" ")}
      >
        <label className={style.interruptor}>
          {/* <input
            type="checkbox"
            className={style.switch}
            onClick={() => {
              changeTheme(!darkMode);
            }}
          /> */}
          <span
            className={style.button}
            onClick={() => {
              changeTheme(!darkMode);
            }}
          ></span>
        </label>
      </div>
    </div>
  );
}
