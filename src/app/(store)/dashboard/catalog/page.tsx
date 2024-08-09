import { CreateProduct } from "@/ui/form/create-product";
import { getProducts } from "./action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";
import { Suspense } from "react";
import { Skeleton } from "@/ui/shadcn/skeleton";
import { DelEdit } from "@/ui/common/del-edit";
import { Product, ProductSummary } from "@/types/product";
import { PrevNext } from "@/ui/common/prev-next";
import { formatCurrency } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

async function Products({ currentPage }: { currentPage: number }) {
  const { products, total } = await getProducts(currentPage, ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, total);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const productData = (product: Product): ProductSummary => ({
    name: product.name,
    sku: product.sku,
    price: product.price,
    description: product.description ?? undefined,
    variants: product.variants,
  });

  return (
    <>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.sku}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.price, "$")}</TableCell>
            <TableCell className="text-right">
              <DelEdit product={productData(product)} id={product.id} />
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

function ProductLoader() {
  return Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={index}>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableCell key={index}>
          <Skeleton className="h-[20px] w-[100px]" />
        </TableCell>
      ))}
    </TableRow>
  ));
}

export default async function DashboardCatalog({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <div className="mb-4 flex items-center">
        <h1 className="text-2xl font-bold">Catalog</h1>

        <div className="ml-auto">
          <CreateProduct />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <Suspense key={currentPage} fallback={<ProductLoader />}>
          <Products currentPage={currentPage} />
        </Suspense>
      </Table>
    </>
  );
}
