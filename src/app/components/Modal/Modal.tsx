import { useTheme } from "../../hooks/useTheme";
import styles from "./Modal.module.scss"

export function Modal(props: any) {
    const [darkMode] = useTheme();
    return(
        <div className={[styles.modal, darkMode? styles.darkMode:styles.lightMode]. join(" ")}>
            <p>{props.content}</p>
            <button onClick={props.onConfirm}>✔</button>
            <button onClick={props.onCancel}>❌</button>
        </div>
        )
}