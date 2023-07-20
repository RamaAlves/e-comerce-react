import { Link } from "react-router-dom";
import { CategorySchema } from "../../../interfaces/interfaces";
import { Card } from "../Card/Card";

type Category = {
    category:CategorySchema
}
export function CategoryCard({ category }: Category) {
    return (
      <Link
        to={`/products`}
        state={{ categoryId: category.id }}
      >
        <Card>
          <h1>{category.name}</h1>
          <p>{category.id}</p>
          <img src={category.image} alt={`imagen de ${category.name}`} />
        </Card>
      </Link>
    );
}