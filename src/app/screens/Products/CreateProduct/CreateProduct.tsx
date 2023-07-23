import { useState } from "react";
import { API_CATEGORIES, API_PRODUCTS } from "../../../constants/urlsAPI";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./CreateProduct.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../../constants/queryConstants";
import { Loader } from "../../../components/UI/Loader/Loader";
import {
  CategorySchema,
  ProductSchemaCreate,
} from "../../../interfaces/interfaces";
export function CreateProduct() {
  //Theme
  const [darkMode] = useTheme();

  //states
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<number>(1);

  const navigate = useNavigate();
  //errors
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<boolean>(false);
  const [errorPrice, setErrorPrice] = useState<boolean>(false);

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
  const {
    data: categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useQuery(QUERY_KEY_CATEGORIES, async () => {
    const res = await fetch(API_CATEGORIES);
    const json = await res.json();
    if (json.error == "Not Found") {
      throw new Error(json);
    }
    return json;
  });

  function handleBlurTitle() {
    if (title.length > 0) {
      setErrorTitle(false);
    } else {
      setErrorTitle(true);
    }
  }
  function handleBlurDescription() {
    if (description.length > 0) {
      setErrorDescription(false);
    } else {
      setErrorDescription(true);
    }
  }
  function handleBlurPrice() {
    if (price > 0) {
      setErrorPrice(false);
    } else {
      setErrorPrice(true);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let urlImage = image;
    if (urlImage.length == 0) {
      urlImage = "https://placeimg.com/640/480/any?r=0.9178516507833767";
    }
    const product: ProductSchemaCreate = {
      title: title,
      price: price,
      description: description,
      categoryId: category,
      images: [urlImage],
    };

    createProduct.mutate(product);
  }

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="inputName">
          Title:{" "}
          <input
            type="text"
            name="title"
            id="inputTitle"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onBlur={handleBlurTitle}
            aria-errormessage="titleErrorID"
            aria-invalid={!errorTitle}
            required
          />
          <small
            id="msg-exist-title-ID"
            aria-live="assertive"
            style={{ visibility: errorTitle ? "visible" : "hidden" }}
          >
            El producto si o si debe tener un titulo
          </small>
        </label>
        <label htmlFor="inputEmail">
          Price:{" "}
          <input
            type="number"
            name="price"
            id="inputPrice"
            min="0"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            onBlur={handleBlurPrice}
            aria-errormessage="priceErrorID"
            aria-invalid={!errorPrice}
            required
          />
          <small
            id="msg-exist-email-ID"
            aria-live="assertive"
            style={{ visibility: errorPrice ? "visible" : "hidden" }}
          >
            Price must be greater than 0
          </small>
        </label>
        <label htmlFor="inputDescription">
          Description:{" "}
          <input
            type="text"
            name="description"
            id="inputDescription"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onBlur={handleBlurDescription}
            aria-errormessage="descriptionErrorID"
            aria-invalid={!errorDescription}
            required
          />
          <small
            id="msg-error-description-ID"
            aria-live="assertive"
            style={{ visibility: errorDescription ? "visible" : "hidden" }}
          >
            Product must be have a description.
          </small>
        </label>
        <label htmlFor="categoryInput">
          Categoria:
          {categoriesError}
          {categoriesStatus === "loading" && <Loader />}
          {categories && (
            <>
              <select
                name="category"
                id="categoryInput"
                value={category}
                onChange={(choise) => {
                  setCategory(Number(choise.target.value));
                }}
                required
              >
                {categories.map((category: CategorySchema) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </label>
        <label htmlFor="inputImage">
          image's URL:{" "}
          <input
            type="url"
            name="image"
            id="inputImage"
            placeholder="URL of image"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </label>
        <button
          disabled={!(!errorPrice && !errorDescription && !errorTitle)}
          type="submit"
          className={styles.btnRegister}
        >
          Create product
        </button>
        {" or "}
        <Link to="/products">Cancel</Link>
      </form>
    </main>
  );
}
