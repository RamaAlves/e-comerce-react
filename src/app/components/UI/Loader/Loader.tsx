import styles from "./Loader.module.scss";
export function Loader() {
  return (
    <>
      <span className={styles.container}>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
        <span className={styles.loader}></span>
      </span>
    </>
  );
}
