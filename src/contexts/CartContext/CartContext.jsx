// contexts/CartContext/CartContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import fakeStoreApi from '../../services/api/fakeStoreApi.js';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Auto-run: Fetch user's cart when they log in
    useEffect(() => {
        if (user) {
            fetchUserCart();
        } else {
            setCart(null);
        }
    }, [user]);

    // Fetch user's existing cart from backend
    const fetchUserCart = async () => {
        if (!user) return;

        setLoading(true);
        try {
            console.log('[CartContext] Fetching cart for user:', user.id);

            // Get all carts and find the user's cart
            const allCarts = await fakeStoreApi.getAllCarts();
            const userCart = allCarts.find(c => c.userId === user.id);

            if (userCart) {
                console.log('[CartContext] Found existing cart:', userCart);
                setCart(userCart);
            } else {
                console.log('[CartContext] No existing cart, creating empty cart');
                // Create new empty cart structure
                setCart({
                    id: null, // Will be assigned when saved to backend
                    userId: user.id,
                    date: new Date().toISOString(),
                    products: []
                });
            }
        } catch (err) {
            console.error('[CartContext] Failed to fetch cart:', err);
            setError(err.message);
            // Create empty cart on error
            setCart({
                id: null,
                userId: user.id,
                date: new Date().toISOString(),
                products: []
            });
        } finally {
            setLoading(false);
        }
    };

    // Save cart to backend
    const saveCartToBackend = async (cartData) => {
        try {
            if (cartData.id) {
                // Update existing cart
                console.log('[CartContext] Updating cart:', cartData.id);
                await fakeStoreApi.updateCart(cartData.id, cartData.userId, cartData.products);
            } else {
                // Create new cart
                console.log('[CartContext] Creating new cart');
                const newCart = await fakeStoreApi.addNewCart(
                    Date.now(), // Temporary ID
                    cartData.userId,
                    cartData.products
                );
                cartData.id = newCart.id;
            }
            return cartData;
        } catch (err) {
            console.error('[CartContext] Failed to save cart:', err);
            throw err;
        }
    };

    // Add product to cart
    const addToCart = useCallback(async (productId, quantity = 1) => {
        if (!user) {
            throw new Error('Must be logged in to add items to cart');
        }

        if (!cart) {
            console.error('[CartContext] Cart not initialized');
            return;
        }

        try {
            console.log('[CartContext] Adding to cart:', productId, 'x', quantity);

            // Check if product already in cart
            const existingProductIndex = cart.products.findIndex(
                p => p.productId === productId
            );

            let updatedProducts;
            if (existingProductIndex >= 0) {
                // Update quantity
                updatedProducts = [...cart.products];
                updatedProducts[existingProductIndex] = {
                    productId,
                    quantity: updatedProducts[existingProductIndex].quantity + quantity
                };
            } else {
                // Add new product
                updatedProducts = [
                    ...cart.products,
                    { productId, quantity }
                ];
            }

            const updatedCart = {
                ...cart,
                products: updatedProducts,
                date: new Date().toISOString()
            };

            // Save to backend
            const savedCart = await saveCartToBackend(updatedCart);
            setCart(savedCart);

            console.log('[CartContext] Cart updated successfully');
        } catch (err) {
            console.error('[CartContext] Failed to add to cart:', err);
            throw err;
        }
    }, [cart, user]);

    // Remove product from cart
    const removeFromCart = useCallback(async (productId) => {
        if (!user || !cart) return;

        try {
            console.log('[CartContext] Removing from cart:', productId);

            const updatedProducts = cart.products.filter(
                p => p.productId !== productId
            );

            const updatedCart = {
                ...cart,
                products: updatedProducts,
                date: new Date().toISOString()
            };

            const savedCart = await saveCartToBackend(updatedCart);
            setCart(savedCart);

            console.log('[CartContext] Product removed successfully');
        } catch (err) {
            console.error('[CartContext] Failed to remove from cart:', err);
            throw err;
        }
    }, [cart, user]);

    // Update product quantity
    const updateQuantity = useCallback(async (productId, quantity) => {
        if (!user || !cart) return;

        if (quantity <= 0) {
            return removeFromCart(productId);
        }

        try {
            console.log('[CartContext] Updating quantity:', productId, quantity);

            const updatedProducts = cart.products.map(p =>
                p.productId === productId
                    ? { ...p, quantity }
                    : p
            );

            const updatedCart = {
                ...cart,
                products: updatedProducts,
                date: new Date().toISOString()
            };

            const savedCart = await saveCartToBackend(updatedCart);
            setCart(savedCart);

            console.log('[CartContext] Quantity updated successfully');
        } catch (err) {
            console.error('[CartContext] Failed to update quantity:', err);
            throw err;
        }
    }, [cart, user, removeFromCart]);

    // Clear entire cart
    const clearCart = useCallback(async () => {
        if (!user || !cart) return;

        try {
            console.log('[CartContext] Clearing cart');

            const updatedCart = {
                ...cart,
                products: [],
                date: new Date().toISOString()
            };

            const savedCart = await saveCartToBackend(updatedCart);
            setCart(savedCart);

            console.log('[CartContext] Cart cleared successfully');
        } catch (err) {
            console.error('[CartContext] Failed to clear cart:', err);
            throw err;
        }
    }, [cart, user]);

    // Get cart item count
    const getCartItemCount = useCallback(() => {
        if (!cart) return 0;
        return cart.products.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    // Get cart total (requires product prices - we'll calculate in CartPage)
    const getCartTotal = useCallback((products) => {
        if (!cart || !products) return 0;
        return cart.products.reduce((total, cartItem) => {
            const product = products.find(p => p.id === cartItem.productId);
            return total + (product ? product.price * cartItem.quantity : 0);
        }, 0);
    }, [cart]);

    const value = {
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemCount,
        getCartTotal,
        refreshCart: fetchUserCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}