import { Link } from "react-router-dom";
import { CategorySchema } from "../../../interfaces/interfaces";
import { Card } from "../Card/Card";
import { useUser } from "../../../hooks/useUser";

type Category = {
  category: CategorySchema;
};
export function CategoryCard({ category }: Category) {
  const { user } = useUser();
  return (
    <Link to={`/products`} state={{ categoryId: category.id }}>
      <Card>
        <h1>{category.name}</h1>
        <p>{category.id}</p>
        <img src={category.image} alt={`imagen de ${category.name}`} />
        {user?.role === "admin" && (
          <section >
            <Link to={`/categories/edit/${category.id}`}>
              Edit category 🖋
            </Link>
          </section>
        )}
      </Card>
    </Link>
  );
}
