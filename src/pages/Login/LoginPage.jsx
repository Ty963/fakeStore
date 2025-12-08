import {useForm} from "react-hook-form"
import fakeStoreApi from "../../services/api/fakeStoreApi";
import {Link} from "react-router-dom";
import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";
import styles from "./LoginPage.module.css";
import {Activity, useState} from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import handlePostErrors from "../../helpers/handlePostErrors.js";

export default function LoginPage() {
    // TODO: Once this is done, implement the viewports, blueprint is to be found on the LoginPage.module.css file. use rem and em units for the sizes.
    // TODO: After all that is done, implement the different theme styles
    // Noice

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const {register, handleSubmit} = useForm();
    const { theme } = useTheme();
    const [error, setError] = useState({
        isError: false,
        handled: false,
        status: false,
        message: false,
        shouldRetry: false,
        originalError: false,
        validationErrors: false
    });

    // Tested to see if useTheme hook was working correctly, it is.
    // console.log(theme);

    async function handleFormSubmit(data) {
        try {
            // TODO: implement login logic, implement more logic and navigation after successful contexts implementation.
            const response = await fakeStoreApi.authenticateUser(data.username, data.password);
        } catch (e) {
            const FAKESTORE_API_URL = import.meta.env.VITE_FAKESTORE_API;
            const endpoint = FAKESTORE_API_URL + "/auth/login"
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className={`${styles[`section-container`]} ${styles[`section-container__${theme}`]}`}>

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
                {/*The one underneath here does not work, it's just a placeholder for the error message, it's not being rendered. I'm not quite sure why, that is something that is worth getting into later*/}
                {/*<ErrorMessage message={error.isError}/>*/}
            </Activity>

            <button id={styles[`submit-button`]} type="submit" className={`${styles[`submit-button`]} ${styles[`submit-button__${theme}`]}`}>
                Login
            </button>

            <Link to="/register" className={`${styles.link} ${styles[`link__${theme}`]}`}>
                Register here
            </Link>

        </form>
    </div>
    )
}