import { ChildrenType } from "../../../interfaces/interfaces"
import styles from "./ContainerButtons.module.scss"

export function ContainerButtons({children}:ChildrenType) {
    return <div className={styles.container}>{children}</div>
}