"use client";

import { Edit2, Ellipsis, Trash2 } from "lucide-react";
import { memo, useCallback, useContext } from "react";

import { CatalogContext } from "@/app/(auth)/dashboard/catalog/catalog-provider";
import type { ProductSummary } from "@/types/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";

interface Props {
  id: number;
  product: ProductSummary;
}

function DelEditComponent({ id, product }: Props): JSX.Element {
  const { setId, setIsRemove, setIsEdit, setProduct } =
    useContext(CatalogContext);

  const handleEdit = useCallback(() => {
    setIsEdit(true);
    setProduct(product);
    setId(id);
  }, [setIsEdit, setProduct, setId, id, product]);

  const handleRemove = useCallback(() => {
    setIsRemove(true);
    setId(id);
  }, [setIsRemove, setId, id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit2 size={12} className="mr-2" /> Edit
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleRemove}>
          <Trash2 size={12} className="mr-2" /> Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const DelEdit = memo(DelEditComponent);
