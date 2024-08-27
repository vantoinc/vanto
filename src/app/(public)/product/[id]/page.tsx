import { notFound } from "next/navigation";
import { singleProduct } from "../../data";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/ui/shadcn/button";

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
      <main className="grid gap-8 py-8 md:grid-cols-[1fr_460px] w-full md:w-[1024px] lg:w-[1200px] mx-auto">
        <div className="h-[400px]">
          <Image
            src={`/upload/${product.imageUrl}`}
            width={400}
            height={400}
            className="rounded-lg w-full h-[400px]"
            alt={product.name}
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <strong className="text-xl block">
            {formatCurrency(product.price)}
          </strong>

          <Button className="w-full">Add to cart</Button>
        </div>
      </main>
    </>
  );
}
