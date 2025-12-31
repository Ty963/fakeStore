import {useForm} from "react-hook-form";
import fakeStoreApi from "../../services/api/fakeStoreApi";
import {Link} from "react-router-dom";
import {Activity, useState} from "react";
import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";
import styles from "../Register/Register.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import handlePostErrors from "../../helpers/handlePostErrors.js";

export default function RegisterPage() {
    const {register, handleSubmit} = useForm();
    // TODO: make sure error handling is complete.
    const [error, setError] = useState({
        isError: false,
        handled: false,
        status: false,
        message: false,
        shouldRetry: false,
        originalError: false,
        validationErrors: false
    });

    const [show, setShow] = useState(false);
    const {theme} = useTheme();

    const handleClose = () => setShow(false);  
    const handleShow = () => setShow(true)

    async function handleFormSubmit(data) {
        try {
            // TODO: implement login logic, implement more logic and navigation after successful contexts implementation.
            const response = await fakeStoreApi.addNewUser(data.username, data.email, data.password);
            handleShow();
        } catch (e) {
            const FAKESTORE_API_URL = import.meta.env.VITE_FAKESTORE_API;
            const endpoint = FAKESTORE_API_URL + "/users";
            const errorInfo = handlePostErrors(e, endpoint)
            setError({
                isError: true,
                handled: errorInfo.handled,
                status: errorInfo.status,
                message: errorInfo.message,
                shouldRetry: errorInfo.shouldRetry,
                originalError: errorInfo.originalError,
                validationErrors: errorInfo.validationErrors
            });
        }
    }

    return (
        <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Modal heading
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Success!!! You are registered
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            <form onSubmit={handleSubmit(handleFormSubmit)}
                  className={`${styles[`section-container`]} ${styles[`section-container__${theme}`]}`}>

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
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'This field is required',
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
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'This field is required',
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
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'This field is required',
                            }
                        })}
                    />
                </div>

                <Activity mode={(error.isError) ? "visible" : "hidden"}>
                    <ErrorMessage message={(error.isError) ? error.message : null}/>
                </Activity>

                <button id={styles[`submit-button`]} type="submit" className={`${styles[`submit-button`]} ${styles[`submit-button__${theme}`]}`}>
                    Register
                </button>

                <Link to="/" className={`${styles.link} ${styles[`link__${theme}`]}`}>
                    Login here
                </Link>

            </form>
        </div>
    );
}