import { createContext, useEffect, useState } from "react";

type DarkmodeContextType = {
  isDarkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
};

export const DarkmodeContext = createContext<DarkmodeContextType>({
  isDarkmode: false,
  setDarkmode: () => {},
});

type DarkmodeProviderProps = {
  children: React.ReactNode;
};

export const DarkmodeProvider = ({ children }: DarkmodeProviderProps) => {
  const [isDarkmode, setDarkmode] = useState(getDarkmode());

  function getDarkmode(): boolean {
    if (localStorage.getItem("darkmode") === "false") return false;
    if (localStorage.getItem("darkmode") === "true") return true;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyDarkmode(darkmode: boolean) {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(darkmode ? "dark" : "light");
    localStorage.setItem("darkmode", darkmode.toString());
  }

  useEffect(() => {
    applyDarkmode(isDarkmode);
  }, [isDarkmode]);

  return (
    <DarkmodeContext.Provider value={{ isDarkmode, setDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  );
};
