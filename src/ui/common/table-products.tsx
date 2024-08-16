import { DelEdit } from "@/ui/common/del-edit";
import { Product, ProductSummary } from "@/types/product";
import { PrevNext } from "@/ui/common/prev-next";
import { formatCurrency } from "@/lib/utils";
import { getProducts } from "@/app/(store)/manage/catalog/data";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/ui/shadcn/table";
import { Skeleton } from "@/ui/shadcn/skeleton";
import { Package } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export async function TableProducts({
  currentPage,
}: {
  currentPage: number;
}): Promise<JSX.Element> {
  const { products, total } = await getProducts(currentPage, ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const productData = (product: Product): ProductSummary => ({
    name: product.name,
    price: product.price,
    description: product.description ?? undefined,
    billing: product.billing,
    Variant: product.Variant,
  });

  return (
    <>
      <TableBody>
        {products.length < 1 && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              <div className="bg-muted inline-block rounded-full p-3">
                <Package size={44} />
              </div>
              <h2 className="text-xl font-bold">No products yet</h2>
              <p className="text-muted-foreground">
                there are no products at the moment
              </p>
            </TableCell>
          </TableRow>
        )}
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(product.price, "$")}
            </TableCell>
            <TableCell className="text-right w-[80px]">
              <DelEdit id={product.id} product={productData(product)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>
        <div className="flex items-center">
          <p>
            Showing{" "}
            <strong>
              {start} to {end}
            </strong>{" "}
            of <strong>{total}</strong> products
          </p>
          <PrevNext page={currentPage} totalPages={totalPages} />
        </div>
      </TableCaption>
    </>
  );
}

export function ProductLoader(): JSX.Element[] {
  return Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton className="h-[20px] w-[100px]" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
