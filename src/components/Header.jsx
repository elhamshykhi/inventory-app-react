import { useProduct } from "../context/ProductContext";

function Header() {
  const { products } = useProduct();

  return (
    <div className="bg-gray-800 h-16 flex items-center justify-between sticky top-0 inset-x-0 border-b border-b-gray-700">
      <div className="container mx-auto lg:max-w-screen-lg flex items-center justify-between px-4">
        <h1 className="text-saffron font-bold text-xl capitalize">
          inventory app
        </h1>
        
        {/* all products quantity */}
        <span className="bg-gray-700 border border-gray-600 w-7 h-7 rounded-full flex items-center justify-center">
          <span id="all_products_quantity" className="text-saffron">
            {products.length}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Header;
