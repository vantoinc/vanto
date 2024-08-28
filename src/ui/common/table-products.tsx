import Image from "next/image";

import { getProducts } from "@/app/(auth)/dashboard/catalog/data";
import { formatCurrency } from "@/lib/utils";
import type { Product, ProductSummary } from "@/types/product";
import { DelEdit } from "@/ui/common/del-edit";
import { EmptyProduct } from "@/ui/common/empty-product";
import { PrevNext } from "@/ui/common/prev-next";
import { Skeleton } from "@/ui/shadcn/skeleton";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/ui/shadcn/table";

const ITEMS_PER_PAGE = 10;

const calculatePagination = (
  currentPage: number,
  total: number,
): { start: number; end: number; totalPages: number } => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  return { start, end, totalPages };
};

const productData = (product: Product): ProductSummary => ({
  name: product.name,
  price: product.price,
  stock: product.stock,
  description: product.description ?? undefined,
  Variant: product.Variant,
});

export async function TableProducts({
  currentPage,
}: {
  currentPage: number;
}): Promise<JSX.Element> {
  const { products, total } = await getProducts(currentPage, ITEMS_PER_PAGE);
  const { start, end, totalPages } = calculatePagination(currentPage, total);

  return (
    <>
      <TableBody>
        {products.length < 1 && <EmptyProduct />}
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="flex items-center gap-2">
              <div className="relative size-8 object-cover">
                <Image
                  src={`/upload/${product.imageUrl}`}
                  alt={product.name}
                  className="rounded-md"
                  fill
                />
              </div>
              {product.name}
            </TableCell>
            <TableCell className="text-right">{product.stock}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(product.price, "$")}
            </TableCell>
            <TableCell className="w-[80px] text-right">
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
