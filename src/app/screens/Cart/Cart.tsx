import { Link, useNavigate } from "react-router-dom";
import { CardProductCart } from "../../components/UI/CardProductCart/CardProductCart";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Cart.module.scss";
import { Button } from "../../components/UI/Button/Button";
import { ContainerButtons } from "../../components/UI/ContainerButtons/ContainerButtons";

export function Cart() {
  const {
    items,
    addItem,
    substractItem,
    removeItem,
    total,
    countItems,
    resetCart,
  } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  function pay() {
    resetCart();
    navigate("/buy-success", { replace: true });
  }

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <h1>cart</h1>
      <section className={styles.cartInfo}>
        <article>
          <p>Items total:</p> <p className={styles.info}>{countItems}</p>
        </article>
        <article>
          <p>Total Price:</p>
          <p className={styles.info}>${total}</p>
        </article>
      </section>
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
      {countItems > 0 && (
        <ContainerButtons column={false}>
          <Button purple={true} func={resetCart}>
            Clean
          </Button>
          <Button purple={true} func={pay}>
            Pay
          </Button>
        </ContainerButtons>
      )}
    </main>
  );
}
