import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./CreteCategory.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { CategorySchemaCreate } from "../../../interfaces/interfaces";
import { useMutation } from "react-query";
import { API_CATEGORIES } from "../../../constants/urlsAPI";

export function CreateCategory() {
  const [darkMode] = useTheme();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();

    const [errorName, setErrorName] = useState<boolean>();
    
    const createCategory = useMutation(
      async (data: CategorySchemaCreate) => {
        const res = await fetch(API_CATEGORIES, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.statusCode === 401) {
          throw new Error("Error create");
        }
        return json;
      },
      {
        onSuccess: () => {
          navigate(`/categories`, { replace: true });
        },
        onError: (error) => {
          console.error("Try again. " + error);
        },
      }
    );
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

    createCategory.mutate(category);
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
        <button
          disabled={errorName}
          type="submit"
          className={styles.btnRegister}
        >
          Confirm changes
        </button>
        {" or "}
        <Link to="/categories">Cancel</Link>
      </form>
    </main>
  );
}
