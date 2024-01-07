import Label from "../ui/Label";
import TextInput from "../ui/Input";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useProduct } from "../context/ProductContext";
import { useCategory } from "../context/CategoryContext";

function ProductList() {
  const { filteredProducts, handleDeleteProduct } = useProduct();

  return (
    <div className="h-full">
      <h2 className="text-blue-200 capitalize font-bold mb-4">product list</h2>

      {/* filter */}
      <FilterProducts />

      {/* products list */}
      <div
        id="product_list"
        className="overflow-x-auto h-[calc(100%_-_120px)] overflow-y-auto"
      >
        <table className="table-auto w-full capitalize text-sm">
          <thead className="bg-gray-700 text-blue-200 text-center text-xs">
            <tr className="">
              <th>#</th>
              <th>title</th>
              <th>date</th>
              <th>category</th>
              <th>quantity</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className="border-b border-b-gray-700">
                <td className="text-blue-200 text-xs">{index + 1}</td>
                <td className="capitalize text-nowrap break-keep font-semibold text-base text-white">
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
  const {
    handleSearch,
    searchValue,
    handleSort,
    sortValue,
    handleCategoryFilter,
    categoryValue,
  } = useProduct();
  const { categories } = useCategory();

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
      {/* search */}
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

      {/* category filter */}
      <div className="w-full min-[450px]:flex-1">
        <Label name="productList_category_filter" label="category :" />

        <select
          name="filterCategory"
          id="productList_category_filter"
          className="input capitalize text-sm"
          value={categoryValue}
          onChange={handleCategoryFilter}
        >
          <option value="">all</option>
          {categories.map((category) => (
            <option
              key={category.title}
              value={category.title}
              className="bg-gray-800"
            >
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
