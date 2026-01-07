import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext/ThemeContext.jsx';
import styles from './UnauthorizedPage.module.css';

export default function UnauthorizedPage() {
    const { theme } = useTheme();

    return (
        <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
            <div className={styles.content}>
                <h1 className={`${styles.title} ${styles[`title__${theme}`]}`}>
                    🔒 Access Denied
                </h1>
                <p className={`${styles.message} ${styles[`message__${theme}`]}`}>
                    You must be logged in to view this page.
                </p>
                <Link
                    to="/"
                    className={`${styles.button} ${styles[`button__${theme}`]}`}
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
}