import { Suspense, useState } from "react";
import { ProductSchema } from "../../../interfaces/interfaces";
import { Card } from "../Card/Card";
import { Loader } from "../Loader/Loader";
import { ContainerButtons } from "../ContainerButtons/ContainerButtons";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { useCart } from "../../../hooks/useCart";
import { createPortal } from "react-dom";
import { NotificationAddItem } from "../../Modal/Notification/NotificationAddItem/NotificationAddItem";
import { useUser } from "../../../hooks/useUser";

type Product = {
  product: ProductSchema;
};

export function ProductCard({ product }: Product) {
  const { addItem } = useCart();
  const { user } = useUser();
  //states
  const [showNotification, setShowNotification] = useState<boolean>(false);

  return (
    <Card>
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
      <div>
        <h3>{product.title}</h3>
        <p>{product.category.name}</p>
      </div>
      <ContainerButtons column={true}>
        <Link to={`/products/${product.id}`}>
          <Button purple={false}>Details</Button>
        </Link>

        {user &&
          <Button
            purple={true}
            func={() => {
              addItem(product);
              setShowNotification(true);
            }}
          >
            🛒
          </Button>}
      </ContainerButtons>
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
    </Card>
  );
}
