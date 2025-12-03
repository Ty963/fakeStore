import {useForm} from "react-hook-form";
import fakeStoreApi from "../../services/api/fakeStoreApi";
import {Link} from "react-router-dom";
import {Activity, useState} from "react";
import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";
import styles from "../Register/Register.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

export default function RegisterPage() {
    const {register, handleSubmit} = useForm();
    // const {error, setError} = useState(null);
    const {theme} = useTheme();


    async function handleFormSubmit(data) {
        console.log(data);
        // TODO: Take the handle form submit and put it in a try catch block, subsequently we can take the error, if there is one, catch it and pass it to the error state, depending on which we will do conditional rendering of the error message element. Follow the same procedure as in the login page.
        // const response = await fakeStoreApi.registerUser(data.username, data.email, data.password);
        // console.log(response);
    }

    return (
        <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
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

                {/*<Activity mode={(error.isError) ? "visible" : "hidden"}>*/}
                {/*    <ErrorMessage message={(error.isError) ? error.message : null}/>*/}
                {/*</Activity>*/}

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