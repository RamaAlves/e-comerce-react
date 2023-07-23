import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./FormProduct.module.scss";
import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../../constants/queryConstants";
import { API_CATEGORIES } from "../../../constants/urlsAPI";
import {
  CategorySchema,
  ProductSchema,
  ProductSchemaCreate,
} from "../../../interfaces/interfaces";
import { Link } from "react-router-dom";
import { Loader } from "../../UI/Loader/Loader";
import { RANDOM_IMAGE } from "../../../constants/generalConstants";

interface FormProduct {
  onSubmit: unknown;
  product?: ProductSchema;
}
export function FormProduct(props: any) {
  //Theme
  const [darkMode] = useTheme();

  //states
  const [title, setTitle] = useState<string>(
    props.product ? props.product.title : ""
  );
  const [price, setPrice] = useState<number>(
    props.product ? props.product.price : 0
  );
  const [description, setDescription] = useState<string>(
    props.product ? props.product.description : ""
  );
  const [image, setImage] = useState<string>(
    props.product ? props.product.images[0] : ""
  );
  const [category, setCategory] = useState<number>(
    props.product ? props.product.category.id : 1
  );

  //errors
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<boolean>(false);
  const [errorPrice, setErrorPrice] = useState<boolean>(false);

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
      urlImage = RANDOM_IMAGE;
    }
    const product: ProductSchemaCreate = {
      title: title,
      price: price,
      description: description,
      categoryId: category,
      images: [urlImage],
    };

    props.onSubmit.mutate(product);
  }

  return (
    <form
      className={[
        styles.form,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
      onSubmit={handleSubmit}
    >
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
        {categoriesError && (
          <select name="category">
            <option value="error">Error</option>
          </select>
        )}
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
        Confirm
      </button>
      {" or "}
      <Link to="/products">Cancel</Link>
    </form>
  );
}
