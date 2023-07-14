import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../constants/queryConstants";
import { API_CATEGORIES } from "../../constants/urlsAPI";
import { CategorySchema } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { Card } from "../../components/UI/Card/Card";
import styles from "./Categories.module.scss";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Loader } from "../../components/UI/Loader/Loader";
import { ErrorComponent } from "../../components/Error/ErrorComponent";

export function Categories() {
  const [darkMode] = useContext(ThemeContext);
  async function fetchCategories() {
    const res = await fetch(API_CATEGORIES);
    const json = await res.json();
    if (json.statusCode === 404) {
      throw new Error(json);
    }
    console.log(json);
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
        <ErrorComponent/>
      ) : (
        <>
          <h1 className={styles.title}>Categories</h1>
          <section className={styles.containerCategories}>
            {status === "loading" && <Loader />}
            {data &&
              data.map((category: CategorySchema) => {
                return (
                  <Link
                    key={category.id}
                    to={`/products`}
                    state={{ categoryId: category.id }}
                  >
                    <Card>
                      <h1>{category.name}</h1>
                      <p>{category.id}</p>
                      <img
                        src={category.image}
                        alt={`imagen de ${category.name}`}
                      />
                    </Card>
                  </Link>
                );
              })}
          </section>
        </>
      )}
    </main>
  );
}
