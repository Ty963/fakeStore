import styles from "./NotFoundPage.module.css";
import {useTheme} from "../../contexts/ThemeContext/ThemeContext.jsx";

export default function NotFoundPage() {

    const {theme} = useTheme();

    return (
        <div className={`${styles.wrapper} ${styles[`wrapper__${theme}`]}`}>
            <h1 className={`${styles.header} ${styles[`header__${theme}`]}`}>
                404: Page not Found
            </h1>
            <p className={`${styles.content} ${styles[`content__${theme}`]}`}>
                The following page does not / no longer exists:
            </p>
        </div>
    )
}