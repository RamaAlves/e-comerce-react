import { createContext, useEffect, useState } from "react";
import { ChildrenType } from "../interfaces/interfaces";
import { DARK_MODE } from "../constants/localStorageConstants";


export const ThemeContext =
  createContext<any>(
    false
  ); /* no encontre como tipar el context para que me acepte el state */

export function ThemeProvider({ children }: ChildrenType) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const value = [darkMode, setDarkMode];
  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem(DARK_MODE)!);
    if (theme) {
      setDarkMode(theme);
    }
  }, []);
  /* useEffect(() => {
    localStorage.setItem(DARK_MODE, JSON.stringify(darkMode));
  }, [darkMode]); */
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
