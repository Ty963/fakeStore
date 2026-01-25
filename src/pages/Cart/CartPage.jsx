// pages/Cart/CartPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { useStoreData } from '../../hooks/useStoreData.js';
import styles from './CartPage.module.css';

export default function CartPage() {
    const { theme } = useTheme();
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const { fetchSingleProduct } = useStoreData();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Auto-run: Fetch full product details for cart items
    useEffect(() => {
        async function loadCartItems() {
            if (!cart || cart.products.length === 0) {
                setLoading(false);
                return;
            }

            try {
                console.log('[CartPage] Loading cart items...');

                // Fetch full product details for each cart item
                const productPromises = cart.products.map(async (cartItem) => {
                    const product = await fetchSingleProduct(cartItem.productId);
                    return {
                        ...product,
                        cartQuantity: cartItem.quantity
                    };
                });

                const products = await Promise.all(productPromises);
                setCartItems(products);
                console.log('[CartPage] Cart items loaded:', products.length);
            } catch (err) {
                console.error('[CartPage] Failed to load cart items:', err);
            } finally {
                setLoading(false);
            }
        }

        loadCartItems();
    }, [cart, fetchSingleProduct]);

    // User-triggered: Remove item from cart
    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (err) {
            alert('Failed to remove item from cart');
        }
    };

    // User-triggered: Update item quantity
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await updateQuantity(productId, newQuantity);
        } catch (err) {
            alert('Failed to update quantity');
        }
    };

    // User-triggered: Clear entire cart
    const handleClearCart = async () => {
        if (!window.confirm('Are you sure you want to clear your entire cart?')) {
            return;
        }

        try {
            await clearCart();
        } catch (err) {
            alert('Failed to clear cart');
        }
    };

    // Calculate total
    const total = getCartTotal(cartItems);

    if (loading) {
        return (
            <div className={`${styles.loading} ${styles[`loading__${theme}`]}`}>
                <div className={styles.spinner}></div>
                <p>Loading cart...</p>
            </div>
        );
    }

    if (!cart || cart.products.length === 0) {
        return (
            <div className={`${styles.emptyCart} ${styles[`emptyCart__${theme}`]}`}>
                <div className={styles.emptyIcon}>🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <button
                    onClick={() => navigate('/products')}
                    className={`${styles.shopButton} ${styles[`shopButton__${theme}`]}`}
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${styles[`container__${theme}`]}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Shopping Cart</h1>
                <button
                    onClick={handleClearCart}
                    className={`${styles.clearButton} ${styles[`clearButton__${theme}`]}`}
                >
                    Clear Cart
                </button>
            </div>

            <div className={styles.cartLayout}>
                {/* Cart Items */}
                <div className={styles.cartItems}>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.cartItem} ${styles[`cartItem__${theme}`]}`}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles.itemImage}
                                onClick={() => navigate(`/product/${item.id}`)}
                            />

                            <div className={styles.itemDetails}>
                                <h3
                                    className={styles.itemTitle}
                                    onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    {item.title}
                                </h3>
                                <p className={styles.itemCategory}>
                                    {item.category}
                                </p>
                                <p className={styles.itemPrice}>
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>

                            <div className={styles.itemControls}>
                                <div className={styles.quantityControls}>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.cartQuantity - 1)}
                                        className={`${styles.quantityButton} ${styles[`quantityButton__${theme}`]}`}
                                        disabled={item.cartQuantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className={styles.quantity}>
                                        {item.cartQuantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.cartQuantity + 1)}
                                        className={`${styles.quantityButton} ${styles[`quantityButton__${theme}`]}`}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className={styles.itemTotal}>
                                    ${(item.price * item.cartQuantity).toFixed(2)}
                                </div>

                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className={`${styles.removeButton} ${styles[`removeButton__${theme}`]}`}
                                    title="Remove from cart"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className={`${styles.cartSummary} ${styles[`cartSummary__${theme}`]}`}>
                    <h2>Order Summary</h2>

                    <div className={styles.summaryRow}>
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Tax:</span>
                        <span>${(total * 0.1).toFixed(2)}</span>
                    </div>

                    <div className={styles.summaryDivider}></div>

                    <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                        <span>Total:</span>
                        <span className={styles.totalAmount}>
                            ${(total * 1.1).toFixed(2)}
                        </span>
                    </div>

                    <button
                        className={`${styles.checkoutButton} ${styles[`checkoutButton__${theme}`]}`}
                        onClick={() => alert('Checkout functionality coming soon!')}
                    >
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={() => navigate('/products')}
                        className={`${styles.continueButton} ${styles[`continueButton__${theme}`]}`}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}