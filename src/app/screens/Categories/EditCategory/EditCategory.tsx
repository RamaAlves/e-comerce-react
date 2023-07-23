import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditCategory.module.scss";
import { useTheme } from "../../../hooks/useTheme";
import { useEffect, useState } from "react";
import { CategorySchemaCreate } from "../../../interfaces/interfaces";
import { API_CATEGORIES } from "../../../constants/urlsAPI";
import { useMutation } from "react-query";

export function EditCategory() {
  const [darkMode] = useTheme();
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const navigate = useNavigate();

  const [errorName, setErrorName] = useState<boolean>();

  useEffect(() => {
    getUniqueCategory.mutate(id);
  }, []);
  const getUniqueCategory = useMutation(
    async (id: string | undefined) => {
      const res = await fetch(API_CATEGORIES + `/${id}`, {
        method: "GET",
      });
      const json = await res.json();
      if (json.statusCode === 401) {
        throw new Error("Category not found");
      }
      return json;
    },
    {
      onSuccess: (data) => {
        setName(data?.name);
        setImage(data?.image);
      },
      onError: (error) => {
        console.error("Error " + error);
        navigate(`/categories`, { replace: true });
      },
    }
  );

  const updateCategory = useMutation(
    async (data: CategorySchemaCreate) => {
      const res = await fetch(API_CATEGORIES + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.statusCode === 401) {
        throw new Error("Error al actualizar");
      }
      return json;
    },
    {
      onSuccess: () => {
        navigate(`/categories`, { replace: true });
      },
      onError: (error) => {
        console.error("Edit category error. " + error);
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

    updateCategory.mutate(category);
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
