import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../constants/queryConstants";
import { API_CATEGORIES } from "../../constants/urlsAPI";
import { CategorySchema } from "../../interfaces/interfaces";
import styles from "./Categories.module.scss";
import { Loader } from "../../components/UI/Loader/Loader";
import { ErrorComponent } from "../../components/Error/ErrorComponent";
import { useTheme } from "../../hooks/useTheme";
import { CategoryCard } from "../../components/UI/CategoryCard/CategoryCard";

export function Categories() {
  const [darkMode] = useTheme();
  async function fetchCategories() {
    const res = await fetch(API_CATEGORIES);
    const json = await res.json();
    if (json.statusCode === 404) {
      throw new Error(json);
    }
    return json;
  }
  const { data, status, error } = useQuery(
    QUERY_KEY_CATEGORIES,
    fetchCategories
  );

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      {error ? (
        <ErrorComponent />
      ) : (
        <>
          <h1 className={styles.title}>Categories</h1>
          <section className={styles.containerCategories}>
            {status === "loading" && <Loader />}
            {data &&
              data.map((category: CategorySchema) => {
                return (
                  <CategoryCard key={category.id} category={category} />
                  
                );
              })}
          </section>
        </>
      )}
    </main>
  );
}
