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
import { EmptyProduct } from "./empty-product";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

const calculatePagination = (currentPage: number, total: number) => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  return { start, end, totalPages };
};

const productData = (product: Product): ProductSummary => ({
  name: product.name,
  price: product.price,
  description: product.description ?? undefined,
  billing: product.billing,
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
              <div className="object-cover size-8 relative">
                <Image
                  src={`/upload/${product.imageUrl}`}
                  alt={product.name}
                  className="rounded-md"
                  fill
                />
              </div>
              {product.name}
            </TableCell>
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
