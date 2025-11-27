import {useForm} from "react-hook-form"
import fakeStoreApi from "../../services/api/fakeStoreApi";
import {Link} from "react-router-dom";
import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    // TODO import the CSS and get to work with the style and format, use a placeholder color scheme for now
    // TODO: Once this is done, implement the viewports
    // TODO: After all that is done, implement the different theme styles
    // TODO: Complete the error handling for the login form, find a way to present the error on the page using conditional rendering
    // Noice

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const {register, handleSubmit} = useForm();
    const {theme} = useTheme();

    // Tested to see if useTheme hook was working correctly, it is.
    console.log(theme);

    // Code Snippet that shows how to ...
    // <button
    //     className={`${styles.button} ${primary ? styles.primary : ""} ${large ? styles.large : ""}`}
    // >
    //     Click Me
    // </button>

    async function handleFormSubmit(data) {
        // TODO: implement login logic, implement more logic and navigation after successful contexts implementation.
        const response = await fakeStoreApi.authenticateUser(data.username, data.password);
        console.log(response);
    }

    return (
        // <div className={`wrapper wrapper__${theme}`}>
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={`section-container section-container__${theme}`}>

                <h2>
                    Login
                </h2>

                <div className={`input-group input-group__${theme}`}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'This field is required',
                            }
                        })}
                    />
                </div>

                <div className={`input-group input-group__${theme}`}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'This field is required',
                            }
                        })}
                    />
                </div>

                <button type="submit" className={`submit-button submit-button__${theme}`}>
                    Login
                </button>

                <Link to="/register" className={`link link__${theme}`}>
                    Register here
                </Link>

            </form>
        </div>
    )
}