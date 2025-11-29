import {useForm} from "react-hook-form"
import fakeStoreApi from "../../services/api/fakeStoreApi";
import {Link} from "react-router-dom";
import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";
import styles from "./LoginPage.module.css";
import {useState} from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

export default function LoginPage() {
    // TODO: Complete the error handling for the login form, find a way to present the error on the page using conditional rendering
    // TODO: Once this is done, implement the viewports
    // TODO: After all that is done, implement the different theme styles
    // Noice

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const {register, handleSubmit} = useForm();
    const { theme } = useTheme();
    const [error, setError] = useState(false);

    // Tested to see if useTheme hook was working correctly, it is.
    console.log(theme);

    async function handleFormSubmit(data) {
        // TODO: implement login logic, implement more logic and navigation after successful contexts implementation.
        const response = await fakeStoreApi.authenticateUser(data.username, data.password);
        console.log(response);
    }

    return <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
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

            <ErrorMessage error={error} />

            <button id={styles[`submit-button`]} type="submit" className={`${styles[`submit-button`]} ${styles[`submit-button__${theme}`]}`}>
                Login
            </button>

            <Link to="/register" className={`${styles.link} ${styles[`link__${theme}`]}`}>
                Register here
            </Link>

        </form>
    </div>
}