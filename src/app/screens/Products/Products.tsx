import { useQuery } from "react-query";
import {
  QUERY_KEY_CATEGORIES,
  QUERY_KEY_PRODUCTS,
} from "../../constants/queryConstants";
import { API_CATEGORIES, API_PRODUCTS } from "../../constants/urlsAPI";
import { Link, useLocation, useParams } from "react-router-dom";
import { useContext, useState, Suspense } from "react";
import { CategorySchema, ProductSchema } from "../../interfaces/interfaces";
import { Card } from "../../components/UI/Card/Card";
import { Button } from "../../components/UI/Button/Button";
import styles from "./Products.module.scss";
import { ContainerButtons } from "../../components/UI/ContainerButtons/ContainerButtons";
import { ThemeContext } from "../../context/ThemeContext";
import { Loader } from "../../components/UI/Loader/Loader";

export function Products() {
  const [darkMode] = useContext(ThemeContext);
  const { state } = useLocation();
  const [urlQuery, setUrlQuery] = useState(
    state?.categoryId
      ? API_PRODUCTS + `/?categoryId=${state?.categoryId}`
      : API_PRODUCTS
  );

  async function fetchProducts() {
    /* if (categoryId) {
      const res = await fetch(API_PRODUCTS + `/?categoryId=${categoryId}`);
      const json = await res.json();
      console.log(json);
      return json;
    } else { */
    console.log(urlQuery);
    const res = await fetch(urlQuery);
    const json = await res.json();
    console.log(json);
    return json;
    /* } */
  }

  const {
    data: products,
    status: productsStatus,
    error: productsError,
  } = useQuery(QUERY_KEY_PRODUCTS, fetchProducts);

  const {
    data: categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useQuery(QUERY_KEY_CATEGORIES, async () => {
    const res = await fetch(API_CATEGORIES);
    const json = await res.json();
    console.log(json);
    return json;
  });
  function updateQuery(e) {
    e.preventDefault();
  }
  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <section className={styles.containerFilter}>
        <form className={styles.formFilter}>
          {categories && (
            <>
              <label htmlFor="categoryInput">Categoria: </label>
              <select name="category" id="categoryInput">
                {categories.map((category: CategorySchema) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="min">Min price: </label>
              <input type="number" id="min" />
              <label htmlFor="max">Max price: </label>
              <input type="number" id="max" />
              <button onClick={updateQuery}>Apply</button>
            </>
          )}
        </form>
      </section>
      <section className={styles.containerProducts}>
        {productsError ? (
          <h1>Error</h1>
        ) : (
          <>
            {productsStatus === "loading" && <Loader />}
            {products &&
              products.map((product: ProductSchema) => {
                return (
                  <Card key={product.id}>
                    <h3>{product.title}</h3>
                    <p>{product.category.name}</p>
                    <Suspense fallback={<Loader />}>
                      <img
                        src={product.images[0]}
                        alt={`imagen de ${product.title}`}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/images/imagesProductsDefault/FallbackProduct.jpg")
                        }
                      />
                    </Suspense>
                    <ContainerButtons>
                      <Link to={`/products/${product.id}`}>
                        <Button buy={false}>Details</Button>
                      </Link>
                      <Link to={`/products/${product.id}`}>
                        <Button buy={true}>Buy</Button>
                      </Link>
                    </ContainerButtons>
                  </Card>
                );
              })}
          </>
        )}
      </section>
    </main>
  );
}
