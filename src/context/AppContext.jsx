import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isOpenCategoryForm, setIsOpenCategoryForm] = useState(false);

  const handleOpenCategory = () => setIsOpenCategoryForm(true);
  const handleCloseCategory = () => setIsOpenCategoryForm(false);

  return (
    <AppContext.Provider
      value={{ isOpenCategoryForm, handleOpenCategory, handleCloseCategory }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
