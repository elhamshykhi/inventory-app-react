import { useRef } from "react";

import { useApp } from "../context/AppContext";
import { useCategory } from "../context/CategoryContext";
import { useProduct } from "../context/ProductContext";

import Button from "../ui/Button";
import Label from "../ui/Label";
import TextInput from "../ui/Input";

function AddNewProduct() {
  const { handleOpenCategory, isOpenCategoryForm } = useApp();
  const { categories } = useCategory();
  const { handleChange, handleAddNewProduct, productFormData } = useProduct();

  const quantityRef = useRef();

  return (
    <>
      {!isOpenCategoryForm && (
        <div className="bg-gray-800 px-4 py-6 rounded-2xl">
          <h2 className="text-blue-200 capitalize font-bold mb-4">
            add new product
          </h2>

          <form action="" className="space-y-3" onSubmit={handleAddNewProduct}>
            <TextInput
              name="title"
              label="product title"
              value={productFormData.title}
              handle={handleChange}
            />

            <div>
              <Label name="quantity" label="quantity" />
              <input
                type="number"
                min="1"
                name="quantity"
                id="quantity"
                className="input"
                onChange={handleChange}
                onClick={() => quantityRef.current.select()}
                value={productFormData.quantity}
                placeholder="quantity"
                ref={quantityRef}
              />
            </div>

            <div className="">
              <div className="flex items-center justify-between">
                <Label name="product_category" label="product category" />

                <button
                  type="button"
                  onClick={handleOpenCategory}
                  className="text-xs font-medium capitalize text-blue-200 px-2 rounded-full mb-2"
                >
                  add new category ?
                </button>
              </div>

              <select
                name="category"
                id="product_category"
                className="input capitalize text-sm"
                value={productFormData.category}
                onChange={handleChange}
              >
                <option>select a category</option>
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

            <div className="flex items-center justify-between gap-x-2 pt-3">
              <Button text="cancel" />
              <Button text="add new product" type="submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddNewProduct;
