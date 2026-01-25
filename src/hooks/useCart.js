// hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext/CartContext.jsx';

/**
 * Custom hook to access CartContext
 * Must be used inside CartProvider
 */
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used inside CartProvider');
    }

    return context;
}