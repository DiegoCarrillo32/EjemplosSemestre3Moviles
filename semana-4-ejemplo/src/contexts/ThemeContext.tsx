import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeContextType, ThemeMode } from "../interfaces/ThemeContext";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [Mode, setMode] = useState<ThemeMode>(systemColorScheme || "dark");

  const toggleTheme = () => {
    setMode(Mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{
        mode: Mode,
        colors: Colors[Mode], // Colors["light"] - Colors["dark"],
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext: Still loading");
  }

  return context;
};
