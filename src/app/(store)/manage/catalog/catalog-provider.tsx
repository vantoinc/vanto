"use client";

import { ProductSummary } from "@/types/product";
import { createContext, useState } from "react";

interface ContextType {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  product: ProductSummary;
  setProduct: React.Dispatch<React.SetStateAction<ProductSummary>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isRemove: boolean;
  setIsRemove: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: ContextType = {
  id: 0,
  setId: () => {},
  product: {} as ProductSummary,
  setProduct: () => {},
  isEdit: false,
  setIsEdit: () => {},
  isRemove: false,
  setIsRemove: () => {},
};

export const CatalogContext = createContext<ContextType>(defaultContextValue);

export function CatalogProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [id, setId] = useState<number>(0);
  const [product, setProduct] = useState<ProductSummary>({} as ProductSummary);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);

  return (
    <CatalogContext.Provider
      value={{
        id,
        setId,
        product,
        setProduct,
        isEdit,
        setIsEdit,
        isRemove,
        setIsRemove,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}
