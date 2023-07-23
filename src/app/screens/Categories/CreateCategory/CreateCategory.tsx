/* import { useState } from "react"; */
import { useTheme } from "../../../hooks/useTheme";
import styles from "./CreteCategory.module.scss";
import { /* Link, */ useNavigate } from "react-router-dom";
import { CategorySchemaCreate } from "../../../interfaces/interfaces";
import { useMutation } from "react-query";
import { API_CATEGORIES } from "../../../constants/urlsAPI";
import { FormCategory } from "../../../components/Forms/FormCategory/FormCategory";

export function CreateCategory() {
  const [darkMode] = useTheme();
  const navigate = useNavigate();

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

  return (
    <main
      className={[
        styles.main,
        darkMode ? styles.darkMode : styles.lightMode,
      ].join(" ")}
    >
      <FormCategory onSubmit={createCategory} ></FormCategory>
    </main>
  );
}
