import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../constants/queryConstants";
import { API_CATEGORIES } from "../../constants/urlsAPI";
import { CategorySchema } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { Card } from "../../components/UI/Card/Card";

export function Categories() {
  async function fetchCategories() {
    const res = await fetch(API_CATEGORIES);
    const json = await res.json();
    if (json.statusCode === 404) {
      throw new Error(json);
    }
    console.log(json);
    return json;
  }
  const { data, status, error } = useQuery(
    QUERY_KEY_CATEGORIES,
    fetchCategories
  );

  return (
    <main>
      {status === "loading" && <h1>cargando...</h1>}
      {error && <h1>Error</h1>}
      {data &&
        data.map((category: CategorySchema) => {
          return (
            <Link key={category.id} to={`/products/category/${category.id}`}>
              <Card>
                <h1>{category.name}</h1>
                <p>{category.id}</p>
                <img src={category.image} alt={`imagen de ${category.name}`} />
              </Card>
            </Link>
          );
        })}
    </main>
  );
}
