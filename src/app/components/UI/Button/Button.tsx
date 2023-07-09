import styles from "./Button.module.scss";
import { ButtonType } from "../../../interfaces/interfaces";


export function Button({children, buy}:ButtonType) {
    return <div className={buy?styles.buy: styles.button}>{children}</div>;
}