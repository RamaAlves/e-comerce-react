import { useTheme } from "../../../hooks/useTheme";
import styles from "./ModalDelete.module.scss";

interface ModalDeleteProps {
  content: string;
  onConfirm?: (() => {}) | (() => void);
  onCancel?: (() => {}) | ((e: React.MouseEvent<HTMLElement>) => void);
}

export function ModalDelete(props: ModalDeleteProps) {
  const {darkMode} = useTheme();
  return (
    <div
      className={[
        styles.container,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <div className={styles.background}></div>
      <div className={styles.modal}>
        <p>{props.content}</p>
        <section className={styles.containerButtons}>
          <button className={styles.confirm} onClick={props.onConfirm}>
            ✔
          </button>
          <button className={styles.cancel} onClick={props.onCancel}>
            ✖
          </button>
        </section>
      </div>
    </div>
  );
}
