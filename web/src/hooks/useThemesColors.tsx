import { createContext, ReactNode, useContext, useState } from "react";

interface ThemesColorsProviderProps {
  children: ReactNode;
}

interface ThemesColorsContextData {
  theme: 'DARK' | 'LIGHT';
  changeThemesColors: () => void;
}

const ThemesColorsContext = createContext<ThemesColorsContextData>({} as ThemesColorsContextData);

export function ThemesColorsProvider({ children }: ThemesColorsProviderProps) {
  const [theme, setTheme] = useState(() => {
    const storagedTheme = localStorage.getItem('@Widget:theme');

    if (storagedTheme) {
      return JSON.parse(storagedTheme);
    }

    localStorage.setItem('@Widget:theme', JSON.stringify('DARK'));
    return 'DARK';
  });

  function changeThemesColors() {
    let themeColor;
    if (theme === 'DARK') {
      document.documentElement.classList.remove('dark');
      themeColor = 'LIGHT';
    } else {
      document.documentElement.classList.add('dark');
      themeColor = 'DARK';
    }

    setTheme(themeColor);
    localStorage.setItem('@Widget:theme', JSON.stringify(themeColor));
  }

  return (
    <ThemesColorsContext.Provider
      value={{
        theme,
        changeThemesColors,
      }}
    >
      {children}
    </ThemesColorsContext.Provider>
  )
}

export function useThemesColors() {
  const context = useContext(ThemesColorsContext);

  return context;
}