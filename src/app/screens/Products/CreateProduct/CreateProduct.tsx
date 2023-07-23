import { API_PRODUCTS } from "../../../constants/urlsAPI";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./CreateProduct.module.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ProductSchemaCreate } from "../../../interfaces/interfaces";
import { FormProduct } from "../../../components/Forms/FormProduct/FormProduct";
export function CreateProduct() {
  //Theme
  const [darkMode] = useTheme();

  const navigate = useNavigate();

  const createProduct = useMutation(
    async (data: ProductSchemaCreate) => {
      const res = await fetch(API_PRODUCTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.statusCode === 401) {
        throw new Error("Error create product");
      }
      return json;
    },
    {
      onSuccess: (data) => {
        const id = data?.id;
        navigate(`/products/${id}`, { replace: true });
      },
      onError: (error) => {
        console.error("Try again. " + error);
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
      <FormProduct onSubmit={createProduct}></FormProduct>
    </main>
  );
}
