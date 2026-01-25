import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext.jsx";
import { useAuth } from "../../hooks/useAuth.js"; // ← Use the context!
import styles from "../Register/Register.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function RegisterPage() {
    const { register: registerForm, handleSubmit } = useForm();
    const { register: registerUser } = useAuth(); // ← Get register from context
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [error, setError] = useState({
        isError: false,
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        navigate('/'); // Redirect to login page after closing modal
    };

    async function handleFormSubmit(data) {
        setIsSubmitting(true);
        setError({ isError: false, message: '' });

        try {
            console.log('[RegisterPage] Attempting registration...');

            // ✅ Use context register function
            await registerUser(data.username, data.email, data.password);

            console.log('[RegisterPage] Registration successful!');

            // Show success modal
            setShow(true);

        } catch (e) {
            console.error('[RegisterPage] Registration failed:', e);
            setError({
                isError: true,
                message: e.message || 'Registration failed. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
            {/* Success Modal */}
            <Modal
                centered
                show={show}
                onHide={handleClose}
                data-bs-theme="dark"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Registration Successful! 🎉
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your account has been created successfully!
                    <br />
                    You can now log in with your credentials.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Go to Login
                    </Button>
                </Modal.Footer>
            </Modal>

            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={`${styles[`section-container`]} ${styles[`section-container__${theme}`]}`}
            >
                <h2 className={`${styles[`section-header`]} ${styles[`section-header__${theme}`]}`}>
                    Register
                </h2>

                <div className={`${styles[`input-group`]} ${styles[`input-group__${theme}`]}`}>
                    <input
                        placeholder="Username"
                        type="text"
                        id={styles.username}
                        name="username"
                        className={`${styles[`input-field`]} ${styles[`input-field__${theme}`]}`}
                        disabled={isSubmitting}
                        {...registerForm('username', {
                            required: {
                                value: true,
                                message: 'Username is required',
                            },
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters'
                            }
                        })}
                    />
                </div>

                <div className={`${styles[`input-group`]} ${styles[`input-group__${theme}`]}`}>
                    <input
                        placeholder="Email"
                        type="email"
                        id={styles.email}
                        name="email"
                        className={`${styles[`input-field`]} ${styles[`input-field__${theme}`]}`}
                        disabled={isSubmitting}
                        {...registerForm('email', {
                            required: {
                                value: true,
                                message: 'Email is required',
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
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
                        {...registerForm('password', {
                            required: {
                                value: true,
                                message: 'Password is required',
                            },
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
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
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>

                <Link to="/" className={`${styles.link} ${styles[`link__${theme}`]}`}>
                    Already have an account? Login here
                </Link>
            </form>
        </div>
    );
}