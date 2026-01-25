// pages/ProductDetail/ProductDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import { useStoreData } from '../../hooks/useStoreData.js';
import { useCart } from '../../hooks/useCart.js';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { theme } = useTheme();
    const { fetchSingleProduct, isLoading, error } = useStoreData();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const navigate = useNavigate();

    // Auto-run: Fetch product details when page loads
    useEffect(() => {
        async function loadProduct() {
            try {
                console.log('[ProductDetailPage] Fetching product:', id);
                const data = await fetchSingleProduct(id);
                setProduct(data);
                console.log('[ProductDetailPage] Product loaded:', data);
            } catch (err) {
                console.error('[ProductDetailPage] Failed to load product:', err);
            }
        }
        loadProduct();
    }, [id, fetchSingleProduct]);

    // User-triggered: Add product to cart
    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            await addToCart(product.id, quantity);
            setAddedToCart(true);
            console.log('[ProductDetailPage] Added to cart:', product.id, 'x', quantity);

            // Reset success message after 2 seconds
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (err) {
            console.error('[ProductDetailPage] Failed to add to cart:', err);
            alert('Failed to add to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    // User-triggered: Navigate back to products
    const handleBackClick = () => {
        navigate('/products');
    };

    if (isLoading || !product) {
        return (
            <div className={`${styles.loading} ${styles[`loading__${theme}`]}`}>
                <div className={styles.spinner}></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.error} ${styles[`error__${theme}`]}`}>
                <h2>Error Loading Product</h2>
                <p>{error}</p>
                <button onClick={handleBackClick}>
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${styles[`container__${theme}`]}`}>
            <button
                onClick={handleBackClick}
                className={`${styles.backButton} ${styles[`backButton__${theme}`]}`}
            >
                ← Back to Products
            </button>

            <div className={styles.productDetails}>
                {/* Product Image */}
                <div className={`${styles.imageSection} ${styles[`imageSection__${theme}`]}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.productImage}
                    />
                </div>

                {/* Product Info */}
                <div className={styles.infoSection}>
                    <div className={styles.category}>
                        {product.category}
                    </div>

                    <h1 className={styles.title}>
                        {product.title}
                    </h1>

                    <div className={styles.rating}>
                        <span className={styles.stars}>
                            {'⭐'.repeat(Math.round(product.rating.rate))}
                        </span>
                        <span className={styles.ratingText}>
                            {product.rating.rate} ({product.rating.count} reviews)
                        </span>
                    </div>

                    <div className={styles.price}>
                        ${product.price.toFixed(2)}
                    </div>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className={`${styles.quantitySection} ${styles[`quantitySection__${theme}`]}`}>
                        <label htmlFor="quantity">Quantity:</label>
                        <div className={styles.quantityControls}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className={`${styles.quantityButton} ${styles[`quantityButton__${theme}`]}`}
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className={`${styles.quantityInput} ${styles[`quantityInput__${theme}`]}`}
                                min="1"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className={`${styles.quantityButton} ${styles[`quantityButton__${theme}`]}`}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={addingToCart || addedToCart}
                        className={`${styles.addToCartButton} ${styles[`addToCartButton__${theme}`]} ${addedToCart ? styles.added : ''}`}
                    >
                        {addedToCart ? '✓ Added to Cart!' : addingToCart ? 'Adding...' : '🛒 Add to Cart'}
                    </button>

                    <button
                        onClick={() => navigate('/cart')}
                        className={`${styles.viewCartButton} ${styles[`viewCartButton__${theme}`]}`}
                    >
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    );
}