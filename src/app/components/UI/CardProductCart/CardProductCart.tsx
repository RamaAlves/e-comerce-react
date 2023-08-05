import styles from "./CardProductCart.module.scss";
import { CardProductCartProps } from "../../../interfaces/interfaces";
import { useTheme } from "../../../hooks/useTheme";

export function CardProductCart({
  product,
  onSubstract,
  onAdd,
  onRemove,
}: CardProductCartProps) {
  const { darkMode } = useTheme();
  return (
    <div className={[
        styles.container,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}>
      <img src={product.images[0]} alt={`image ${product.title}`} />
      <div className={styles.containerInfo}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.price}>
          <p className={styles.unitPrice}>Price: ${product.price}</p>
          <p className={styles.subtotal}>Subtotal: ${product.price*product.quantity}</p>
          <div className={styles.quantity}>
            <button
              onClick={() => {
                onSubstract(product.id);
              }}
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              onClick={() => {
                onAdd(product);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          onRemove(product.id);
        }}
      >
        ❌
      </button>
    </div>
  );
}
