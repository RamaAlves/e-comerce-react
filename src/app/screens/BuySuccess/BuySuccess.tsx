import { Link } from "react-router-dom";
import styles from "./BuySuccess.module.scss";
import { useTheme } from "../../hooks/useTheme";
export function BuySuccess() {
  const { darkMode } = useTheme();
  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <h1>Successful purchase! 🎉🎉🎉</h1>
      <article>
        <p>Thanks for your purchase.</p>
        <Link to="/products">Go to shop</Link>
      </article>
    </main>
  );
}
