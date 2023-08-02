import { useTheme } from "../../../../hooks/useTheme";
import { ProductSchema } from "../../../../interfaces/interfaces";
import styles from "./NotificationAddItem.module.scss";

interface Notification {
  product: ProductSchema;
  onRemove?: () => void;
}

export function NotificationAddItem(props: Notification) {
  const { darkMode } = useTheme();

  setTimeout(() => {
    if (props.onRemove) {
      props.onRemove();
    }
  }, 2000);
  return (
    <div
      className={[
        styles.container,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <div className={styles.notification}>
        <p>Item {props.product.title} adding to cart</p>
      </div>
    </div>
  );
}
