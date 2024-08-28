import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency, generateSlug } from "@/lib/utils";
import { Card, CardContent } from "@/ui/shadcn/card";

import { getAllProduct } from "./data";

export default async function Home(): Promise<JSX.Element> {
  const { products } = await getAllProduct();

  return (
    <>
      <header className="border-b px-4">
        <div className="mx-auto flex h-14 w-full items-center md:w-[1024px] lg:w-[1200px]">
          <Link href="/">
            <ShoppingBag size={28} />
          </Link>

          <div className="ml-auto">
            <Link href="#">Home</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="h-52"></section>

        <section className="bg-gray-100 py-12 dark:bg-muted">
          <div className="mx-auto w-full px-4 md:w-[1024px] lg:w-[1200px]">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {products &&
                products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden border bg-white dark:border-zinc-800 dark:bg-muted"
                  >
                    <CardContent className="p-0">
                      <Link
                        href={`/product/${product.id}-${generateSlug(product.name)}`}
                      >
                        <Image
                          alt={product.name}
                          className="h-60 w-full"
                          height="240"
                          src={`/upload/${product.imageUrl}`}
                          width="360"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="mb-1 text-lg font-semibold">
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
