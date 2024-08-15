"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { ProductSummary } from "@/types/product";
import { useContext } from "react";
import { CatalogContext } from "@/app/(store)/manage/catalog/catalog-provider";

interface Props {
  id: number;
  product: ProductSummary;
}

export function DelEdit({ id, product }: Props): JSX.Element {
  const { setId, setIsRemove, setIsEdit, setProduct } =
    useContext(CatalogContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setIsEdit(true);
            setProduct(product);
            setId(id);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setIsRemove(true);
            setId(id);
          }}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
