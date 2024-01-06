import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export default function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleAddNewCategory = (e) => {
    e.preventDefault();
    if (!categoryFormData.title || !categoryFormData.description) return;

    setCategories((prev) =>
      [
        ...prev,
        {
          ...categoryFormData,
          createdAt: new Date().toISOString(),
          id: Date.now(),
        },
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
    setCategoryFormData({ title: "", description: "" });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        handleChange,
        handleAddNewCategory,
        categoryFormData,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
