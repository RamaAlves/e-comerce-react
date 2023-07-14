import { useQuery } from "react-query";
import {
  QUERY_KEY_CATEGORIES,
  QUERY_KEY_PRODUCTS,
} from "../../constants/queryConstants";
import { API_CATEGORIES, API_PRODUCTS } from "../../constants/urlsAPI";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, Suspense } from "react";
import { CategorySchema, ProductSchema } from "../../interfaces/interfaces";
import { Card } from "../../components/UI/Card/Card";
import { Button } from "../../components/UI/Button/Button";
import styles from "./Products.module.scss";
import { ContainerButtons } from "../../components/UI/ContainerButtons/ContainerButtons";
import { ThemeContext } from "../../context/ThemeContext";
import { Loader } from "../../components/UI/Loader/Loader";
import { ErrorComponent } from "../../components/Error/ErrorComponent";

export function Products() {
  const [darkMode] = useContext(ThemeContext);
  const { state } = useLocation();
  const [urlQuery, setUrlQuery] = useState(
    state?.categoryId
      ? API_PRODUCTS + `/?categoryId=${state?.categoryId}`
      : API_PRODUCTS
  );
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;

  async function fetchProducts() {
    const res = await fetch(urlQuery);
    const json = await res.json();
    if (json.error == 'Not Found') {
      throw new Error(json)
    }
    return json;
  }

  const {
    data: products,
    status: productsStatus,
    error: productsError,
  } = useQuery([QUERY_KEY_PRODUCTS, urlQuery], fetchProducts);

  const {
    data: categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useQuery(QUERY_KEY_CATEGORIES, async () => {
    const res = await fetch(API_CATEGORIES);
    const json = await res.json();
    if (json.error == "Not Found") {
      throw new Error(json);
    }
    return json;
  });
  function handleFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // query contains API url
    let query = API_PRODUCTS;
    let FilterData = new FormData(e.currentTarget);
    // add min price to query
    let minPriceInput = FilterData.get("minPrice");
    if (minPriceInput != "" || !minPriceInput.includes('-')) {
      query += `/?price_min=${minPriceInput}`;
    } else {
      query += `/?price_min=${MIN_PRICE}`;
    }
    // add max price to query
    let maxPriceInput = FilterData.get("maxPrice");
    if (maxPriceInput != "" || !maxPriceInput.includes('-')) {
      query += `&price_max=${maxPriceInput}`;
    } else {
      query += `&price_max=${MAX_PRICE}`;
    }
    // add category to query
    let categoryInput = FilterData.get("category");
    if (categoryInput != null) {
      let cat = categories.find((category: CategorySchema) => {
        return category.name == categoryInput;
      });
      query += `&categoryId=${cat.id}`;
    }
    setUrlQuery(query);
  }

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <section className={styles.containerFilter}>
        <form className={styles.formFilter} onSubmit={handleFilter}>
          {categories && (
            <>
              <label htmlFor="categoryInput">Categoria: </label>
              <select name="category" id="categoryInput">
                {categoriesError}
                {categoriesStatus === "loading" && <Loader />}
                {categories.map((category: CategorySchema) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="min">Min price: </label>
              <input type="number" id="min" name="minPrice" />
              <label htmlFor="max">Max price: </label>
              <input type="number" id="max" name="maxPrice" />
              <button type="submit">Apply</button>
            </>
          )}
        </form>
      </section>
      <section className={styles.containerProducts}>
        {productsError ? (
          <ErrorComponent/>
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
                        <Button purple={false}>Details</Button>
                      </Link>
                      <Link to={`/products/${product.id}`}>
                        <Button purple={true}>Buy</Button>
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
