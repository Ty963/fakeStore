import {createContext, useContext, useState} from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    
    const [theme, setTheme] = useState('dark');

    // TODO: if I want to implement more than 2 themes I'm going to need to make this a switch statement or have some other type of modulo division formula
    
    const toggleTheme = () => {
        if (theme === 'blue') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('blue');
        }
    }

    const value = { theme, toggleTheme };

    return (   
        <ThemeContext.Provider value={value}>
            {/* The div underneath will dictate whether the CSS variables with their corresponding names on the modular styles for each page, have either the one value, or the other, depending on the value of the data-theme property, as such I'll be able to use CSS variables  */}
            {/* <div data-theme={currentTheme}> */}
                {children}
            {/* </div> */}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}