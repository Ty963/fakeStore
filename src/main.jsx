import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext/ThemeContext.jsx'
import { UserProvider } from './contexts/UserContext/UserContext.jsx'
import { CartProvider } from './contexts/CartContext/CartContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <UserProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </UserProvider>
        </ThemeProvider>
    </StrictMode>,
)