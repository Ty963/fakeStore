// pages/Products/ProductsPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import { useStoreData } from '../../hooks/useStoreData.js';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
    const { theme } = useTheme();
    const { fetchAllProducts, isLoading, error } = useStoreData();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Auto-run: Fetch products when page loads
    useEffect(() => {
        async function loadProducts() {
            try {
                console.log('[ProductsPage] Fetching products...');
                const data = await fetchAllProducts();
                setProducts(data);
                console.log('[ProductsPage] Products loaded:', data.length);
            } catch (err) {
                console.error('[ProductsPage] Failed to load products:', err);
            }
        }
        loadProducts();
    }, [fetchAllProducts]);

    // User-triggered: Navigate to product detail page
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (isLoading) {
        return (
            <div className={`${styles.loading} ${styles[`loading__${theme}`]}`}>
                <div className={styles.spinner}></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.error} ${styles[`error__${theme}`]}`}>
                <h2>Error Loading Products</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${styles[`container__${theme}`]}`}>
            <h1 className={styles.title}>Our Products</h1>
            <p className={styles.subtitle}>
                Browse our collection of {products.length} amazing products
            </p>

            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`${styles.productCard} ${styles[`productCard__${theme}`]}`}
                        onClick={() => handleProductClick(product.id)}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className={styles.productImage}
                            />
                        </div>

                        <div className={styles.productInfo}>
                            <h3 className={styles.productTitle}>
                                {product.title}
                            </h3>

                            <p className={styles.productCategory}>
                                {product.category}
                            </p>

                            <div className={styles.productFooter}>
                                <span className={styles.productPrice}>
                                    ${product.price.toFixed(2)}
                                </span>

                                <div className={styles.productRating}>
                                    ⭐ {product.rating.rate}
                                    <span className={styles.ratingCount}>
                                        ({product.rating.count})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}