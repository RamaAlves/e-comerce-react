import React, { createContext, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext =
  createContext<any>(
    false
  ); /* no encontre como tipar el context para que me acepte el state */

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const value = [darkMode, setDarkMode];
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
