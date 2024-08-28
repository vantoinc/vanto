import { Suspense } from "react";

import { CreateProduct } from "@/ui/common/create-product";
import { ProductLoader, TableProducts } from "@/ui/common/table-products";
import { UpdateProduct } from "@/ui/common/update-product";
import { RemoveItem } from "@/ui/form/remove-item";
import { Table, TableHead, TableHeader, TableRow } from "@/ui/shadcn/table";

import { CatalogProvider } from "./catalog-provider";

export default async function Catalog({
  searchParams,
}: {
  searchParams: { page: number };
}): Promise<JSX.Element> {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <CatalogProvider>
      <div className="mb-4 flex items-center">
        <h1 className="text-2xl font-bold">Catalog</h1>

        <div className="ml-auto">
          <CreateProduct />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="w-[120px] text-right">Stock</TableHead>
            <TableHead className="w-[120px] text-right">Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <Suspense key={currentPage} fallback={<ProductLoader />}>
          <TableProducts currentPage={currentPage} />
        </Suspense>
      </Table>

      <RemoveItem />
      <UpdateProduct />
    </CatalogProvider>
  );
}
