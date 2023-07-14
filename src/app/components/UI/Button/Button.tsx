import styles from "./Button.module.scss";
import { ButtonType } from "../../../interfaces/interfaces";


export function Button({children, purple}:ButtonType) {
    return <div className={purple?styles.purple: styles.button}>{children}</div>;
}