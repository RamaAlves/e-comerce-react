import { Link, useNavigate } from "react-router-dom";
import { CategorySchema } from "../../../interfaces/interfaces";
import { Card } from "../Card/Card";
import { useUser } from "../../../hooks/useUser";
import { ContainerButtons } from "../ContainerButtons/ContainerButtons";
import { Button } from "../Button/Button";
import styles from "./CategoryCard.module.scss";
import { useMutation } from "react-query";
import { API_CATEGORIES } from "../../../constants/urlsAPI";
import { useState } from "react";
import { ModalDelete } from "../../Modal/ModalDelete/ModalDelete";
import { createPortal } from "react-dom";

type Category = {
  category: CategorySchema;
};
export function CategoryCard({ category }: Category) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const MODAL_MESSAGE = "Are you sure delete this category?";

  const deleteCategory = useMutation(
    async () => {
      const res = await fetch(API_CATEGORIES + `/${category.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.status != 200) {
        throw new Error(json?.name);
      }
      return json;
    },
    {
      onSuccess: () => {
        navigate(`/categories`, { replace: true });
      },
      onError: (error) => {
        console.error("Delete category error. " + error);
        navigate(`/categories`, { replace: true });
      },
    }
  );

  function handleConfirmDelete() {
    console.log("borrando");
    deleteCategory.mutate();
  }

  return (
    <Link className={styles.link} to={`/products`} state={{ categoryId: category.id }}>
      <Card>
        <img src={category.image} alt={`imagen de ${category.name}`} />
        <h3>{category.name}</h3>
        {user?.role === "admin" && (
          <>
            <ContainerButtons column={true}>
              <Link to={`/categories/edit/${category.id}`}>
                <Button purple={false}>Edit 🖋</Button>
              </Link>
              <Button
                purple={true}
                func={(e: React.MouseEvent<HTMLElement>):void => {
                  e.preventDefault();
                  setShowModalDelete(true);
                }}
              >
                Delete
              </Button>
            </ContainerButtons>
          </>
        )}
      </Card>
      {showModalDelete &&
        createPortal(
          <ModalDelete
            content={MODAL_MESSAGE}
            onConfirm={handleConfirmDelete}
            onCancel={(e: React.MouseEvent<HTMLElement>): void => {
              e.preventDefault();
              setShowModalDelete(false);
            }}
          />,
          document.getElementById("portal") as HTMLElement,
          "modal-delete"
        )}
    </Link>
  );
}
