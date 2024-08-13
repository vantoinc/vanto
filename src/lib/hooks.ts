import type { ContextType } from "react";
import { useContext } from "react";

import { CategoryContext } from "@/app/(store)/manage/catalog/category-provider";

export function useCategory(): ContextType<typeof CategoryContext> {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error("useCategory must be used inside a CategoryProvider");
  }

  return context;
}
