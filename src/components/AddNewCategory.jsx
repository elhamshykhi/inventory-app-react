import { useApp } from "../context/AppContext";
import { useCategory } from "../context/CategoryContext";

import Button from "../ui/Button";
import Label from "../ui/Label";
import TextInput from "../ui/Input";

function AddNewCategory() {
  const { isOpenCategoryForm, handleCloseCategory } = useApp();
  const { categoryFormData, handleChange, handleAddNewCategory } =
    useCategory();

  return (
    <>
      {isOpenCategoryForm && (
        <div className="bg-gray-800 px-4 py-6 rounded-2xl">
          <h2 className="text-blue-200 capitalize font-bold mb-4">
            add new category
          </h2>

          <form
            action=""
            className="text-sm space-y-3"
            onSubmit={handleAddNewCategory}
          >
            {/* category title */}
            <TextInput
              name="title"
              label="category title"
              value={categoryFormData.title}
              handle={handleChange}
            />
            
            {/* category description */}
            <div className="flex flex-col h-full">
              <Label name="category_desc" label="category description" />

              <textarea
                name="description"
                id="category_desc"
                className="flex-grow resize-none input"
                value={categoryFormData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex gap-x-2 pt-3">
              <Button text="cancel" handle={handleCloseCategory} />
              <Button text="add new category" type="submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddNewCategory;
