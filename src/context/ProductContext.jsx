import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [productFormData, setProductFormData] = useState({
    title: "",
    quantity: 0,
    category: "",
  });
  const [products, setProducts] = useState([]);

  const [removeProducts, setRemoveProducts] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("latest");
  const [categoryValue, setCategoryValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // get all products from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // save to localStorage when products changes
  useEffect(() => {
    if (products.length) {
      setRemoveProducts(false);
      localStorage.setItem("products", JSON.stringify(products));
    }

    if (removeProducts) localStorage.removeItem("products");
  }, [products, removeProducts]);

  // save input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  // add a new product
  const handleAddNewProduct = (e) => {
    e.preventDefault();
    if (
      !productFormData.title ||
      !productFormData.quantity ||
      !productFormData.category
    )
      return;

    setProducts((prev) => [
      ...prev,
      {
        ...productFormData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setProductFormData({ title: "", quantity: 0, category: "" });
  };

  // delete a product
  const handleDeleteProduct = (productID) => {
    const remainProducts = products.filter(
      (product) => product.id !== productID
    );
    if (products.length === 1) {
      setRemoveProducts(true);
    }
    setProducts(remainProducts);
  };

  // sort & search products & filter based on categories
  useEffect(() => {
    let allProducts = products;
    allProducts = filterSearchTitle(allProducts);
    allProducts = sortData(allProducts);
    allProducts = filterCategory(allProducts);
    setFilteredProducts(allProducts);
  }, [products, searchValue, sortValue, categoryValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  const handleSort = (e) => {
    setSortValue(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryValue(e.target.value);
  };

  function filterSearchTitle(array) {
    return array
      .filter((product) => product.title.toLowerCase().includes(searchValue))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function sortData(array) {
    return [...array].sort((a, b) => {
      if (sortValue === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortValue === "earliest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  }

  function filterCategory(array) {
    if (!categoryValue) return array;
    return array.filter((item) => item.category === categoryValue);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        handleDeleteProduct,
        handleSearch,
        filteredProducts,
        searchValue,
        handleSort,
        sortValue,
        handleChange,
        handleAddNewProduct,
        productFormData,
        handleCategoryFilter,
        categoryValue,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
