import { Link, useNavigate, useParams } from "react-router-dom";
import { API_PRODUCTS } from "../../../constants/urlsAPI";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEY_PRODUCTS_DETAIL } from "../../../constants/queryConstants";
import styles from "./ProductDetails.module.scss";
import { useTheme } from "../../../hooks/useTheme";
import { ErrorComponent } from "../../../components/Error/ErrorComponent";
import { Loader } from "../../../components/UI/Loader/Loader";
import { Carrousel } from "../../../components/Carrousel/Carrousel";
import { useUser } from "../../../hooks/useUser";
import { ContainerButtons } from "../../../components/UI/ContainerButtons/ContainerButtons";
import { Button } from "../../../components/UI/Button/Button";

export function ProductDetails() {
  const [darkMode] = useTheme();
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  async function fetchProducts() {
    const res = await fetch(API_PRODUCTS + `/${id}`);
    const json = await res.json();
    if (json.error == "Not Found") {
      throw new Error(json);
    }
    return json;
  }

  const {
    data: product,
    status: productStatus,
    error: productError,
  } = useQuery([QUERY_KEY_PRODUCTS_DETAIL, id], fetchProducts);

  function handleConfirmDelete() {
    console.log("borrando");
    deleteProduct.mutate();
  }

  function handleDeleteProduct() {
    console.log("abrir modal");
    handleConfirmDelete();
  }

  const deleteProduct = useMutation(
    async () => {
      const res = await fetch(API_PRODUCTS + `/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (res.status != 200) {
        throw new Error(json?.name);
      }
      return json;
    },
    {
      onSuccess: () => {
        navigate(`/products`, { replace: true });
      },
      onError: (error) => {
        console.error("Delete product error. " + error);
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
      <section className={styles.containerProducts}>
        {productError ? (
          <ErrorComponent />
        ) : (
          <>
            {productStatus === "loading" && <Loader />}
            {product && (
              <>
                <h1>{product.title}</h1>
                {user?.role === "admin" && (
                  <ContainerButtons>
                    <Link to={`/products/edit/${id}`}>
                      <Button purple={false}>Edit</Button>
                    </Link>
                    <a
                      className={styles.delete}
                      onClick={handleDeleteProduct}
                    >
                      Delete
                    </a>
                  </ContainerButtons>
                )}
                <Carrousel images={product.images} />
                <h3>Category: {product.category.name}</h3>
                <p>{product.description}</p>
                <h4>Price: ${product.price}</h4>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
