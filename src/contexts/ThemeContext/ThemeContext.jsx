// contexts/ThemeContext/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const THEME_KEY = 'app-theme';

export function ThemeProvider({ children }) {
    // ✅ Initialize from localStorage, default to 'dark'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        return savedTheme || 'dark';
    });

    // ✅ Auto-run: Apply theme to document and save to localStorage
    useEffect(() => {
        // Apply theme attribute to root element for CSS
        document.documentElement.setAttribute('data-theme', theme);

        // Save to localStorage
        localStorage.setItem(THEME_KEY, theme);

        console.log('[ThemeContext] Theme applied:', theme);
    }, [theme]);

    // ✅ User-triggered: Toggle between dark and glassmorphic
    const toggleTheme = () => {
        setTheme(prevTheme => {
            // Toggle between 'dark' and 'glassmorphic'
            return prevTheme === 'dark' ? 'glassmorphic' : 'dark';
        });
    };

    // ✅ User-triggered: Set specific theme
    const setSpecificTheme = (themeName) => {
        setTheme(themeName);
    };

    const value = {
        theme,              // Current theme name
        toggleTheme,        // Function to toggle between themes
        setTheme: setSpecificTheme  // Function to set specific theme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use theme
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }

    return context;
}