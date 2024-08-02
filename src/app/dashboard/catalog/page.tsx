import { CreateProduct } from "@/app/_components/form/create-product";

export default function DashboardCatalog() {
  return (
    <>
      <div className="flex">
        <h1 className="text-2xl font-bold">Catalog</h1>

        <div className="ml-auto">
          <CreateProduct />
        </div>
      </div>
    </>
  );
}
