import styles from "./Button.module.scss";
import { ButtonType } from "../../../interfaces/interfaces";


export function Button({children, purple, func}:ButtonType) {
    return <button onClick={func} className={purple?styles.purple: styles.button}>{children}</button>;
}