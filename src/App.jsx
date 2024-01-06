import "./App.css";

import AddNewCategory from "./components/AddNewCategory";
import AddNewProduct from "./components/AddNewProduct";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import AppProvider from "./context/AppContext";
import CategoryProvider from "./context/CategoryContext";
import ProductProvider from "./context/ProductContext";

function App() {
  return (
    <AppProvider>
      <CategoryProvider>
        <ProductProvider>
          <div className="bg-gray-900 min-h-screen">
            <Header />
            <div className="px-4 py-8 container lg:max-w-screen-lg mx-auto md:grid grid-cols-12 gap-x-4">
              <div className="mb-6 md:col-span-5">
                <AddNewCategory />
                <AddNewProduct />
              </div>
              <div className="md:col-span-7 bg-gray-800 px-4 py-6 rounded-2xl md:h-[calc(100vh_-_128px)]">
                <ProductList />
              </div>
            </div>
          </div>
        </ProductProvider>
      </CategoryProvider>
    </AppProvider>
  );
}

export default App;
