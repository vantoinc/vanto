import { CategoryContext } from "@/app/(store)/manage/[id]/catalog/category-provider";
import { ContextType, useContext } from "react";

export function useCategory(): ContextType<typeof CategoryContext> {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error("useCategory must be used inside a CategoryProvider");
  }

  return context;
}
