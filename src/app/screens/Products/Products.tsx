import { useQuery } from "react-query";
import {
  QUERY_KEY_CATEGORIES,
  QUERY_KEY_PRODUCTS,
} from "../../constants/queryConstants";
import { API_CATEGORIES, API_PRODUCTS } from "../../constants/urlsAPI";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { CategorySchema, ProductSchema } from "../../interfaces/interfaces";

export function Products() {
  const [urlQuery, setUrlQuery] = useState(API_PRODUCTS);
  const { categoryId } = useParams();

  async function fetchProducts() {
    if (categoryId) {
      const res = await fetch(API_PRODUCTS + `/?categoryId=${categoryId}`);
      const json = await res.json();
      console.log(json);
      return json;
    } else {
      const res = await fetch(urlQuery);
      const json = await res.json();
      console.log(json);
      return json;
    }
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
    e.preventDefault()
  }
  return (
    <div>
      <form>
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

      {productsStatus === "loading" && <h1>Cargando...</h1>}
      {products &&
        products.map((product: ProductSchema) => {
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
              <p>{product.category.name}</p>
              <img src={product.images[0]} alt={`imagen de ${product.title}`} />
            </div>
          );
        })}
    </div>
  );
}
