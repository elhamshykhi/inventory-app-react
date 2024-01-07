import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export default function CategoryProvider({ children }) {
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);

  // get categories from localStorage
  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(savedCategories);
  }, []);

  // save to localStorage when categories changes
  useEffect(() => {
    if (categories.length) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  // save input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  // add a new category
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
