import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage(props) {
    const theme = useTheme()

    if (props.error === true) {
        return (
        <p className={`${styles[`error-message`]} ${styles[`error-message__${theme}`]}`}>
            {/*{props.message}*/}
            Error message: The error message goes here
        </p>
        )
    } else {
        return null;
    }
}