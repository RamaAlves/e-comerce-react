import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./FormCategory.module.scss";
import { Link } from "react-router-dom";
import { CategorySchema, CategorySchemaCreate } from "../../../interfaces/interfaces";
/* import { MutationFunction } from "react-query/types/core/types"; */

interface FormCategory{
    onSubmit: unknown
    category?: CategorySchema 
}

export function FormCategory(props: FormCategory) {
  const [darkMode] = useTheme();
  const [name, setName] = useState<string>(
    props.category ? props.category.name : ""
  );
  const [image, setImage] = useState<string>(
    props.category ? props.category.image : ""
  );

  const [errorName, setErrorName] = useState<boolean>();

  function handleBlurName() {
    if (name.length > 0) {
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let urlImage = image;
    if (urlImage.length == 0) {
      urlImage = "https://placeimg.com/640/480/any?r=0.9178516507833767";
    }
    const category: CategorySchemaCreate = {
      name: name,
      image: urlImage,
    };

    props.onSubmit.mutate(category);
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
        name:{" "}
        <input
          type="text"
          name="name"
          id="inputName"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={handleBlurName}
          aria-errormessage="nameErrorID"
          aria-invalid={!errorName}
          required
        />
        <small
          id="msg-exist-name-ID"
          aria-live="assertive"
          style={{ visibility: errorName ? "visible" : "hidden" }}
        >
          The category must be contain a name.
        </small>
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
      <button disabled={errorName} type="submit" className={styles.btnRegister}>
        Confirm
      </button>
      {" or "}
      <Link to="/categories">Cancel</Link>
    </form>
  );
}
