import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { CreateProduct } from "../form/create-product";
import { ProductSummary } from "@/utils/types/product";

interface Props {
  id?: number;
  product: ProductSummary;
}

export function DelEdit({ id, product }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <CreateProduct update product={product} id={id} />
        </DropdownMenuItem>
        <DropdownMenuItem>Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
