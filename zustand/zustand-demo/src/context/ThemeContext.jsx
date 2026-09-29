import { createContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("light");

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider
            value={{ theme, changeTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;