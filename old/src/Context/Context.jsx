import React, { createContext, useContext, useState } from 'react';
import { themes } from '../themes/themes';

const Context = createContext(null);

export default function Provider({ children }) {
  const localThemeID = localStorage.getItem('themeID');
  const localTheme = themes.find((theme) => theme.id === localThemeID);

  const [theme, setTheme] = useState(localTheme || themes[0]);

  return <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>;
}

export const useTheme = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useMyContext must be used within Provider');
  }

  return value;
};
