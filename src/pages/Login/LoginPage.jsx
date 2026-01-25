import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./LoginPage.module.css";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { theme } = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleFormSubmit(data) {
        setIsSubmitting(true);
        setError({ isError: false, message: '' });

        try {
            console.log('[LoginPage] Attempting login...');

            // ✅ Use context login function
            await login(data.username, data.password);

            console.log('[LoginPage] Login successful!');

            // ✅ Navigate to HOME after successful login
            navigate('/home'); // ← Changed from /test to /home

        } catch (e) {
            console.error('[LoginPage] Login failed:', e);
            setError({
                isError: true,
                message: e.message || 'Login failed. Please check your credentials.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={`${styles[`section-container`]} ${styles[`section-container__${theme}`]}`}
            >
                <h2 className={`${styles[`section-header`]} ${styles[`section-header__${theme}`]}`}>
                    Login
                </h2>

                <div className={`${styles[`input-group`]} ${styles[`input-group__${theme}`]}`}>
                    <input
                        placeholder="Username"
                        type="text"
                        id={styles.username}
                        name="username"
                        className={`${styles[`input-field`]} ${styles[`input-field__${theme}`]}`}
                        disabled={isSubmitting}
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'Username is required',
                            }
                        })}
                    />
                </div>

                <div className={`${styles[`input-group`]} ${styles[`input-group__${theme}`]}`}>
                    <input
                        placeholder="Password"
                        type="password"
                        id={styles.password}
                        name="password"
                        className={`${styles[`input-field`]} ${styles[`input-field__${theme}`]}`}
                        disabled={isSubmitting}
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Password is required',
                            }
                        })}
                    />
                </div>

                {error.isError && (
                    <ErrorMessage message={error.message} />
                )}

                <button
                    id={styles[`submit-button`]}
                    type="submit"
                    className={`${styles[`submit-button`]} ${styles[`submit-button__${theme}`]}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <Link to="/register" className={`${styles.link} ${styles[`link__${theme}`]}`}>
                    Register here
                </Link>

                {/* Test credentials helper */}
                <div style={{
                    marginTop: '1rem',
                    padding: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--color)',
                    opacity: 0.7
                }}>
                    <strong>Test Credentials:</strong><br />
                    Username: johnd<br />
                    Password: m38rmF$
                </div>
            </form>
        </div>
    );
}