// pages/Profile/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
    const { theme } = useTheme();
    const { user, logout } = useAuth();
    const { cart, getCartItemCount } = useCart();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return (
            <div className={`${styles.loading} ${styles[`loading__${theme}`]}`}>
                <p>Loading profile...</p>
            </div>
        );
    }

    const cartItemCount = getCartItemCount();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/');
        }
    };

    return (
        <div className={`${styles.container} ${styles[`container__${theme}`]}`}>
            <h1 className={styles.title}>My Profile</h1>

            {/* Profile Header */}
            <div className={`${styles.profileHeader} ${styles[`profileHeader__${theme}`]}`}>
                <div className={styles.avatar}>
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <div className={styles.headerInfo}>
                    <h2 className={styles.username}>
                        {user.username}
                    </h2>
                    <p className={styles.email}>
                        {user.email}
                    </p>
                </div>
            </div>

            {/* Profile Stats */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles[`statCard__${theme}`]}`}>
                    <div className={styles.statIcon}>🛒</div>
                    <div className={styles.statValue}>{cartItemCount}</div>
                    <div className={styles.statLabel}>Cart Items</div>
                </div>

                <div className={`${styles.statCard} ${styles[`statCard__${theme}`]}`}>
                    <div className={styles.statIcon}>📦</div>
                    <div className={styles.statValue}>0</div>
                    <div className={styles.statLabel}>Orders</div>
                </div>

                <div className={`${styles.statCard} ${styles[`statCard__${theme}`]}`}>
                    <div className={styles.statIcon}>❤️</div>
                    <div className={styles.statValue}>0</div>
                    <div className={styles.statLabel}>Wishlist</div>
                </div>
            </div>

            {/* Personal Information */}
            <div className={`${styles.section} ${styles[`section__${theme}`]}`}>
                <div className={styles.sectionHeader}>
                    <h3>Personal Information</h3>
                    {/* <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`${styles.editButton} ${styles[`editButton__${theme}`]}`}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button> */}
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>Username</label>
                        <div className={styles.infoValue}>
                            {user.username}
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <label className={styles.infoLabel}>Email</label>
                        <div className={styles.infoValue}>
                            {user.email}
                        </div>
                    </div>

                    {user.name && (
                        <>
                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}>First Name</label>
                                <div className={styles.infoValue}>
                                    {user.name.firstname || 'Not provided'}
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}>Last Name</label>
                                <div className={styles.infoValue}>
                                    {user.name.lastname || 'Not provided'}
                                </div>
                            </div>
                        </>
                    )}

                    {user.phone && (
                        <div className={styles.infoItem}>
                            <label className={styles.infoLabel}>Phone</label>
                            <div className={styles.infoValue}>
                                {user.phone}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Address Information */}
            {user.address && (
                <div className={`${styles.section} ${styles[`section__${theme}`]}`}>
                    <h3 className={styles.sectionHeader}>Shipping Address</h3>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label className={styles.infoLabel}>Street</label>
                            <div className={styles.infoValue}>
                                {user.address.street} {user.address.number}
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <label className={styles.infoLabel}>City</label>
                            <div className={styles.infoValue}>
                                {user.address.city}
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <label className={styles.infoLabel}>Zip Code</label>
                            <div className={styles.infoValue}>
                                {user.address.zipcode}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Account Actions */}
            <div className={`${styles.section} ${styles[`section__${theme}`]}`}>
                <h3 className={styles.sectionHeader}>Account Actions</h3>

                <div className={styles.actionButtons}>
                    <button
                        onClick={() => navigate('/cart')}
                        className={`${styles.actionButton} ${styles[`actionButton__${theme}`]}`}
                    >
                        🛒 View Cart
                    </button>

                    <button
                        onClick={() => navigate('/products')}
                        className={`${styles.actionButton} ${styles[`actionButton__${theme}`]}`}
                    >
                        🛍️ Browse Products
                    </button>

                    <button
                        onClick={() => navigate('/sell')}
                        className={`${styles.actionButton} ${styles[`actionButton__${theme}`]}`}
                    >
                        💼 Sell Product
                    </button>

                    <button
                        onClick={handleLogout}
                        className={`${styles.logoutButton} ${styles[`logoutButton__${theme}`]}`}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Debug Info (can be removed in production) */}
            <div className={`${styles.debugSection} ${styles[`debugSection__${theme}`]}`}>
                <details>
                    <summary>Debug Info (Developer Only)</summary>
                    <pre className={styles.debugContent}>
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </details>
            </div>
        </div>
    );
}
