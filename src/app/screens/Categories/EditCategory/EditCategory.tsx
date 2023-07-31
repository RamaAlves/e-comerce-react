import { /* Link, */ useNavigate, useParams } from "react-router-dom";
import styles from "./EditCategory.module.scss";
import { useTheme } from "../../../hooks/useTheme";
/* import { useEffect, useState } from "react"; */
import { CategorySchemaCreate } from "../../../interfaces/interfaces";
import { API_CATEGORIES } from "../../../constants/urlsAPI";
import { useMutation, useQuery } from "react-query";
import { FormCategory } from "../../../components/Forms/FormCategory/FormCategory";
import { QUERY_KEY_CATEGORIES } from "../../../constants/queryConstants";
import { Loader } from "../../../components/UI/Loader/Loader";
import { ErrorComponent } from "../../../components/Error/ErrorComponent";

export function EditCategory() {
  const {darkMode} = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: category,
    status: categoryStatus,
    error: categoryError,
  } = useQuery([QUERY_KEY_CATEGORIES, id], async () => {
    const res = await fetch(API_CATEGORIES + `/${id}`);
    const json = await res.json();
    if (json.error == "Not Found") {
      throw new Error(json);
    }
    return json;
  });

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

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <h1>Edit category</h1>
      {categoryError ? (
        <ErrorComponent />
      ) : (
        <>
          {categoryStatus === "loading" && <Loader />}
          {category && (
            <FormCategory
              onSubmit={updateCategory}
              category={category}
            ></FormCategory>
          )}
        </>
      )}
    </main>
  );
}
