import { Link, useNavigate } from "react-router-dom";
import { CardProductCart } from "../../components/UI/CardProductCart/CardProductCart";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Cart.module.scss";

export function Cart() {
  const { items, addItem, substractItem, removeItem, total, countItems, resetCart } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  function pay() {
    resetCart()
    navigate('/buy-success', {replace:true})
  }

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <h1>cart</h1>
      <p>Items total: {countItems}</p>
      <p>Total Price: ${total}</p>
      <button onClick={resetCart}>clean cart</button>
      <section className={styles.containerProducts}>
        {items.length > 0 ? (
          items.map((product: any) => {
            return (
              <CardProductCart
                product={product}
                onAdd={addItem}
                onSubstract={substractItem}
                onRemove={removeItem}
              />
            );
          })
        ) : (
          <>
            <p className={styles.empty}>The cart is empty</p>
            <Link to="/products">Go to shop</Link>
          </>
        )}
      </section>
      <div>
        <button onClick={pay}>Pay</button>
      </div>
    </main>
  );
}
