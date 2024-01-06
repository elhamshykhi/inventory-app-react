import Label from "../ui/Label";
import TextInput from "../ui/Input";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useProduct } from "../context/ProductContext";

function ProductList() {
  const { filteredProducts, handleDeleteProduct } = useProduct();

  return (
    <div className="h-full">
      <h2 className="text-blue-200 capitalize font-bold mb-4">product list</h2>

      {/* search & sort */}
      <FilterProducts />
      
      {/* products list */}
      <div
        id="product_list"
        className="overflow-x-auto h-[calc(100%_-_120px)] overflow-y-auto"
      >
        <table className="table-auto w-full capitalize text-sm">
          <thead className="bg-gray-700 text-blue-200 text-center text-xs">
            <tr className="">
              <th>title</th>
              <th>date</th>
              <th>category</th>
              <th>quantity</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-b-gray-700">
                <td className="capitalize font-semibold text-base text-white">
                  {product.title}
                </td>
                <td className="ml-auto text-xs text-gray-500">
                  <span className="sm:hidden">
                    {new Date(product.createdAt).toLocaleDateString("en", {
                      dateStyle: "short",
                    })}
                  </span>
                  <span className="hidden sm:inline-block">
                    {new Date(product.createdAt).toLocaleDateString("en", {
                      dateStyle: "medium",
                    })}
                  </span>
                </td>

                <td className="text-blue-200 text-xs">{product.category}</td>
                <td className="text-blue-200 text-xs">{product.quantity}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <TrashIcon className="w-5 h-5 stroke-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;

export function FilterProducts() {
  const { handleSearch, searchValue, handleSort, sortValue } = useProduct();

  return (
    <div className="flex items-center justify-between gap-x-2 mb-4">
      {/* search input */}
      <div className="flex-1">
        <TextInput
          name="search"
          label="search :"
          value={searchValue}
          handle={handleSearch}
        />
      </div>

      {/* sort */}
      <div className="flex-1">
        <Label name="productList_sort" label="sort :" />

        <select
          name="sort"
          id="productList_sort"
          className="input capitalize text-sm"
          value={sortValue}
          onChange={handleSort}
        >
          <option value="latest" className="bg-gray-800">
            latest
          </option>
          <option value="earliest" className="bg-gray-800">
            earliest
          </option>
        </select>
      </div>
    </div>
  );
}
