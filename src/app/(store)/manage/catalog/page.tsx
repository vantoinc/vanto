import { CreateProduct } from "@/ui/form/create-product";
import { Table, TableHead, TableHeader, TableRow } from "@/ui/shadcn/table";
import { Suspense } from "react";
import { ProductLoader, TableProducts } from "@/ui/common/table-products";

export default async function Catalog({
  searchParams,
}: {
  searchParams: { page: number };
}): Promise<JSX.Element> {
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
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <Suspense key={currentPage} fallback={<ProductLoader />}>
          <TableProducts currentPage={currentPage} />
        </Suspense>
      </Table>
    </>
  );
}
