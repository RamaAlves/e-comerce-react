import { Link, useNavigate } from "react-router-dom";
import { CategorySchema } from "../../../interfaces/interfaces";
import { Card } from "../Card/Card";
import { useUser } from "../../../hooks/useUser";
import { ContainerButtons } from "../ContainerButtons/ContainerButtons";
import { Button } from "../Button/Button";
import styles from "./CategoryCard.module.scss";
import { useMutation } from "react-query";
import { API_CATEGORIES } from "../../../constants/urlsAPI";

type Category = {
  category: CategorySchema;
};
export function CategoryCard({ category }: Category) {
  const { user } = useUser();
  const navigate = useNavigate();

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

  function handleDeleteCategory() {
    console.log("abrir modal");
    handleConfirmDelete();
  }

  return (
    <Link to={`/products`} state={{ categoryId: category.id }}>
      <Card>
        <h1>{category.name}</h1>
        <p>{category.id}</p>
        <img src={category.image} alt={`imagen de ${category.name}`} />
        {user?.role === "admin" && (
          <>
            <ContainerButtons>
              <Link to={`/categories/edit/${category.id}`}>
                <Button purple={false}>Edit category 🖋</Button>
              </Link>
              <a className={styles.delete} onClick={handleDeleteCategory}>
                Delete
              </a>
            </ContainerButtons>
          </>
        )}
      </Card>
    </Link>
  );
}
