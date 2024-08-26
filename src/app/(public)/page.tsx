import { Card, CardContent } from "@/ui/shadcn/card";
import { getAllProduct } from "./data";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default async function Home(): Promise<JSX.Element> {
  const { products } = await getAllProduct();

  return (
    <>
      <main>
        <section className="bg-gray-100 dark:bg-muted py-12">
          <div className="px-4 w-full md:w-[1024px] lg:w-[1200px] mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products &&
                products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        alt={product.name}
                        className="w-full h-60"
                        height="240"
                        src={`/upload/${product.imageUrl}`}
                        width="360"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
