import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { formatCurrency } from "@/lib/utils";
import { Header } from "@/ui/common/header";
import { Button } from "@/ui/shadcn/button";

import { singleProduct } from "../../data";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const [id, ..._slug] = params.id.split("-");
  const product = await singleProduct(Number(id));

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function SingleProduct({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const [id, ..._slug] = params.id.split("-");
  const product = await singleProduct(Number(id));

  if (!product) {
    return notFound();
  }

  return (
    <>
      <Header />

      <main className="mx-auto grid w-full gap-8 py-8 md:w-[1024px] md:grid-cols-[1fr_460px] lg:w-[1200px]">
        <div className="h-[400px]">
          <Image
            src={`/upload/${product.imageUrl}`}
            width={400}
            height={400}
            className="h-[400px] w-full rounded-lg"
            alt={product.name}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <strong className="block text-xl">
            {formatCurrency(product.price)}
          </strong>

          <Button className="w-full">Add to cart</Button>
        </div>
      </main>
    </>
  );
}
