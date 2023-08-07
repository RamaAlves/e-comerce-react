import { useTheme } from "../../hooks/useTheme";
import styles from "./Home.module.scss";

export function Home() {
  const { darkMode } = useTheme();
  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <h1>Home</h1>
      <article>
        <p>
          This is my first e-comerce build completly whit React and typescript.
        </p>
        <p>Please go to menu and select any section to continue.</p>
        <p>
          Go to Products section and choose your items or go to the Category section and
          explore the options.
        </p>
        <p>Remember, for buy a product you need login first.</p>
        
        <p>✨🎉🎊 Happy shopping! 🎊🎉✨</p>
      </article>
    </main>
  );
}
