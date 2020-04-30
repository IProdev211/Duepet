import React from "react";
import { ThemeProvider } from "styled-components";

const defaultMode = "light";

const ThemeToggleContext = React.createContext({});

export const useTheme = () => React.useContext(ThemeToggleContext);

export const AppThemeProvider: React.FC = ({ children }) => {
  const [themeState, setThemeState] = React.useState({
    mode: defaultMode
  });

  const toggle = (): void => {
    setThemeState({ mode: themeState.mode == "light" ? "dark" : "light" });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider theme={{ mode: themeState.mode }}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
