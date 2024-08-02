import { CreateProduct } from "@/app/_components/form/create-product";
import { getProducts } from "./action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DelEdit } from "@/app/_components/common/del-edit";

async function Products() {
  const products = await getProducts();
  return products.map((product) => (
    <>
      <TableRow>
        <TableCell className="font-medium">{product.sku}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.price}</TableCell>
        <TableCell className="text-right">
          <DelEdit />
        </TableCell>
      </TableRow>
    </>
  ));
}

function ProductLoader() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-[20px] w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[100px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function DashboardCatalog() {
  return (
    <>
      <div className="flex">
        <h1 className="text-2xl font-bold">Catalog</h1>

        <div className="ml-auto">
          <CreateProduct />
        </div>
      </div>

      <div className="my-4 overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<ProductLoader />}>
              <Products />
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
