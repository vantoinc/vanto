"use client";

import { Category } from "@/types/product";
import React, { createContext } from "react";

interface ContextType {
  data: Category[];
}

const defaultContextValue: ContextType = {
  data: [],
};

export const CategoryContext = createContext<ContextType>(defaultContextValue);

export function CategoryProvider({
  children,
  data,
}: ContextType & { children: React.ReactNode }) {
  return (
    <CategoryContext.Provider value={{ data }}>
      {children}
    </CategoryContext.Provider>
  );
}
