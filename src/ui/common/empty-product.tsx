import { Package } from "lucide-react";
import { TableCell, TableRow } from "../shadcn/table";

const NO_PRODUCTS_MESSAGE = {
  title: "No products yet",
  description: "There are no products at the moment",
};

export function EmptyProduct() {
  return (
    <TableRow>
      <TableCell colSpan={3} className="text-center">
        <div className="bg-muted inline-block rounded-full p-3">
          <Package size={44} />
        </div>
        <h2 className="text-xl font-bold">{NO_PRODUCTS_MESSAGE.title}</h2>
        <p className="text-muted-foreground">
          {NO_PRODUCTS_MESSAGE.description}
        </p>
      </TableCell>
    </TableRow>
  );
}
