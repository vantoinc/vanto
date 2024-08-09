import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { CreateProduct } from "../form/create-product";
import { Category, ProductSummary } from "@/types/product";
import { RemoveItem } from "../form/remove-item";

interface Props {
  id?: number;
  product: ProductSummary;
  category: Category[];
}

export function DelEdit({ id, product, category }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <CreateProduct update product={product} id={id} category={category} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RemoveItem id={id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
