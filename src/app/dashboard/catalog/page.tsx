import { CreateProduct } from "@/app/_components/form/create-product";
import { getProducts } from "./action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DelEdit } from "@/app/_components/common/del-edit";
import { Product, ProductSummary } from "@/utils/types/product";
import { PrevNext } from "@/app/_components/common/prev-next";

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
  });

  return (
    <>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.sku}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <DelEdit product={productData(product)} id={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="text-left">
        <p className="float-start">
          Showing{" "}
          <strong>
            {start} - {end}
          </strong>{" "}
          of <strong>{total}</strong> products
        </p>
        <PrevNext page={currentPage} totalPages={totalPages} />
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
      <div className="flex">
        <h1 className="text-2xl font-bold">Catalog</h1>

        <div className="ml-auto">
          <CreateProduct />
        </div>
      </div>

      <div className="my-4">
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
      </div>
    </>
  );
}
