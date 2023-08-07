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
import { useState } from "react";
import { createPortal } from "react-dom";
import { ModalDelete } from "../../../components/Modal/ModalDelete/ModalDelete";
import { useCart } from "../../../hooks/useCart";
import { NotificationAddItem } from "../../../components/Modal/Notification/NotificationAddItem/NotificationAddItem";

export function ProductDetails() {
  const {darkMode} = useTheme();
  const { id } = useParams();
  const { user } = useUser();
  const { addItem } = useCart();
  const navigate = useNavigate();
  //states
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const MODAL_MESSAGE = "Are youy sure delete this product?";

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
      <section className={styles.containerProduct}>
        {productError ? (
          <ErrorComponent />
        ) : (
          <>
            {productStatus === "loading" && <Loader />}
            {product && (
              <>
                <h1>{product.title}</h1>
                {user?.role === "admin" && (
                  <ContainerButtons column={false}>
                    <Link to={`/products/edit/${id}`}>
                      <Button purple={false}>Edit</Button>
                    </Link>
                    <Button
                      purple={true}
                      func={() => {
                        setShowModalDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                  </ContainerButtons>
                )}
                <Carrousel images={product.images} />
                <h3>Category: {product.category.name}</h3>
                <p>{product.description}</p>
                <h4>Price: ${product.price}</h4>
                {user && (
                  <ContainerButtons column={true}>
                    <Button
                      purple={true}
                      func={() => {
                        addItem(product);
                        setShowNotification(true);
                      }}
                    >
                      🛒
                    </Button>
                  </ContainerButtons>
                )}
                {showModalDelete &&
                  createPortal(
                    <ModalDelete
                      content={MODAL_MESSAGE}
                      onConfirm={handleConfirmDelete}
                      onCancel={() => {
                        setShowModalDelete(false);
                      }}
                    />,
                    document.getElementById("portal") as HTMLElement,
                    "modal-delete"
                  )}
                {showNotification &&
                  createPortal(
                    <NotificationAddItem
                      product={product}
                      onRemove={(): void => {
                        setShowNotification(false);
                      }}
                    />,
                    document.getElementById("portal") as HTMLElement,
                    "notification-add-item"
                  )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
