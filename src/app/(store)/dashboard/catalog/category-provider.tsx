"use client";

import { Category } from "@/types/product";
import React, { createContext, useEffect, useState } from "react";
import { getCategory } from "./action";

interface ContextType {
  data: Category[];
  setData: React.Dispatch<React.SetStateAction<Category[]>>;
}

const defaultContextValue: ContextType = {
  data: [],
  setData: () => {},
};

export const CategoryContext = createContext<ContextType>(defaultContextValue);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategory() {
      const category = await getCategory();
      setData(category);
    }

    loadCategory();
  }, []);

  return (
    <CategoryContext.Provider value={{ data, setData }}>
      {children}
    </CategoryContext.Provider>
  );
}
