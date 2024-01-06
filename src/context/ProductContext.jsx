import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productFormData, setProductFormData] = useState({
    title: "",
    quantity: 0,
    category: "",
  });

  const [removeProducts, setRemoveProducts] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("latest");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  useEffect(() => {
    if (products.length) {
      setRemoveProducts(false);
      localStorage.setItem("products", JSON.stringify(products));
    }

    if (removeProducts) localStorage.removeItem("products");
  }, [products, removeProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
    
  };

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

  // sort & search products
  useEffect(() => {
    let allProducts = products;
    allProducts = filterSearchTitle(allProducts);
    allProducts = sortData(allProducts);
    setFilteredProducts(allProducts);
  }, [products, searchValue, sortValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase());
  };

  const handleSort = (e) => {
    setSortValue(e.target.value);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
