import { CategoryContext } from "@/app/(store)/dashboard/catalog/category-provider";
import { useContext } from "react";

export function useCategory() {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error("useCategory must be used inside a CategoryProvider");
  }

  return context;
}
