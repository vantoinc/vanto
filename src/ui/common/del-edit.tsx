import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { CreateProduct } from "../form/create-product";
import { ProductSummary } from "@/types/product";
import { RemoveItem } from "../form/remove-item";

interface Props {
  id?: number;
  product: ProductSummary;
}

export function DelEdit({ id, product }: Props): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <CreateProduct update product={product} id={id} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RemoveItem id={id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
