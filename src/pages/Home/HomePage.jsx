import { useAuth } from '../../hooks/useAuth.js';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Welcome to FakeStore! 🛒
            </h1>

            {user && (
                <div className={styles.userWelcome}>
                    <h2>Hello, {user.username}!</h2>
                    <p>Email: {user.email}</p>
                    {user.name && (
                        <p>
                            Name: {user.name.firstname} {user.name.lastname}
                        </p>
                    )}
                </div>
            )}

            <div className={styles.quickLinks}>
                <div className={styles.card}>
                    <h3>🛍️ Shop Products</h3>
                    <p>Browse our amazing collection of products</p>
                    <Link to="/products" className={styles.cardButton}>
                        View Products
                    </Link>
                </div>

                <div className={styles.card}>
                    <h3>🛒 Your Cart</h3>
                    <p>Check your shopping cart</p>
                    <Link to="/cart" className={styles.cardButton}>
                        View Cart
                    </Link>
                </div>

                <div className={styles.card}>
                    <h3>👤 Profile</h3>
                    <p>Manage your account settings</p>
                    <Link to="/profile" className={styles.cardButton}>
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}