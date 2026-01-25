import { useAuth } from '../../hooks/useAuth.js';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout({ children }) {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { getCartItemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemCount = getCartItemCount();

    return (
        <div className={`${styles.layout} ${styles[`layout__${theme}`]}`}>
            {/* Navbar */}
            <nav className={`${styles.navbar} ${styles[`navbar__${theme}`]}`}>
                <div className={styles.navContent}>
                    {/* Logo/Brand */}
                    <Link to="/home" className={styles.brand}>
                        FakeStore
                    </Link>

                    {/* Nav Links */}
                    <div className={styles.navLinks}>
                        <Link to="/home" className={styles.navLink}>
                            Home
                        </Link>
                        <Link to="/products" className={styles.navLink}>
                            Products
                        </Link>
                        <Link to="/sell" className={styles.navLink}>
                            Sell
                        </Link>
                        {/* Cart Link with Badge */}
                        <Link to="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
                            🛒 Cart
                            {cartItemCount > 0 && (
                                <span className={`${styles.cartBadge} ${styles[`cartBadge__${theme}`]}`}>
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Right side: User info + Theme toggle + Logout */}
                    <div className={styles.navRight}>
                        {user && (
                            <Link
                                to="/profile"
                                className={styles.username}
                                title="View Profile"
                            >
                                👤 {user.username}
                            </Link>
                        )}

                        <button
                            onClick={toggleTheme}
                            className={styles.themeButton}
                            title={`Switch to ${theme === 'dark' ? 'glassmorphic' : 'dark'} theme`}
                        >
                            {theme === 'dark' ? '🌃' : '🌙'}
                        </button>

                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className={styles.main}>
                {children}
            </main>

            {/* Footer */}
            <footer className={`${styles.footer} ${styles[`footer__${theme}`]}`}>
                <p>&copy; 2025 FakeStore. All rights reserved.</p>
            </footer>
        </div>
    );
}