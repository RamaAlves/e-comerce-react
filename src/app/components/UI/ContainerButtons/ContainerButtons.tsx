import { ContainerButtonProps } from "../../../interfaces/interfaces"
import styles from "./ContainerButtons.module.scss"

export function ContainerButtons({children, column}:ContainerButtonProps) {
    return (
      <div
        className={[
          styles.container,
          column ? styles.column : styles.row,
        ].join(" ")}
      >
        {children}
      </div>
    );
}