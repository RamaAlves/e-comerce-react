import { API_PRODUCTS } from "../../../constants/urlsAPI";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./EditProduct.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEY_PRODUCTS_DETAIL } from "../../../constants/queryConstants";
import { Loader } from "../../../components/UI/Loader/Loader";
import { ProductSchemaCreate } from "../../../interfaces/interfaces";
import { ErrorComponent } from "../../../components/Error/ErrorComponent";
import { FormProduct } from "../../../components/Forms/FormProduct/FormProduct";

export function EditProduct() {
  //Theme
  const [darkMode] = useTheme();

  const { id } = useParams();

  const navigate = useNavigate();
  async function fetchProducts() {
    const res = await fetch(API_PRODUCTS + `/${id}`);
    const json = await res.json();
    if (json.error == "Not Found") {
      console.log(json)
      throw new Error(json);
    }
    console.log(json)
    return json;
  }

  const {
    data: product,
    status: productStatus,
    error: productError,
  } = useQuery([QUERY_KEY_PRODUCTS_DETAIL, id], fetchProducts);

  const updateProduct = useMutation(
    async (data: ProductSchemaCreate) => {
      const res = await fetch(API_PRODUCTS + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.statusCode === 401) {
        throw new Error("Error al actualizar");
      }
      return json;
    },
    {
      onSuccess: (data) => {
        const id = data?.id;
        navigate(`/products/${id}`, { replace: true });
      },
      onError: (error) => {
        console.error("Edit product error. " + error);
      },
    }
  );
  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <h1>Edit product</h1>
      {productError ? (
        <ErrorComponent />
      ) : (
        <>
          {productStatus === "loading" && <Loader />}
          {product && (
            <FormProduct
              onSubmit={updateProduct}
              product={product}
            ></FormProduct>
          )}
        </>
      )}
    </main>
  );
}
