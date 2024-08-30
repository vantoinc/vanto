import { ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";

import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";
import { Button } from "@/ui/shadcn/button";

import { singleProduct } from "./data";

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

function ThemeA({
  product,
  children,
}: {
  children: React.ReactNode;
  product: Product;
}): JSX.Element {
  return (
    <div className="relative mx-auto grid min-h-screen w-full max-w-6xl grid-cols-2 items-start gap-8">
      <div className="h-full gap-8 bg-zinc-800 p-8">
        <Image
          src={`/upload/${product.imageUrl}`}
          alt={product.name}
          width={400}
          height={400}
          className="mx-auto max-h-[300px] w-full rounded-md md:max-h-[400px]"
        />
      </div>

      <div className="p-8">{children}</div>
    </div>
  );
}

function ThemeB({
  product,
  children,
}: {
  children: React.ReactNode;
  product: Product;
}): JSX.Element {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center">
      <div className="relative flex flex-col items-start gap-8 md:flex-row">
        <div className="top-0 my-4 flex items-center justify-center max-md:relative md:sticky md:w-1/2">
          <Image
            src={`/upload/${product.imageUrl}`}
            alt={product.name}
            width={400}
            height={400}
            className="max-h-[300px] w-full md:max-h-[400px]"
          />
        </div>
        <div className="my-4 flex flex-col justify-between rounded-xl bg-zinc-800 p-8 text-white shadow-xl md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}

function ThemeC({
  product,
  children,
}: {
  children: React.ReactNode;
  product: Product;
}): JSX.Element {
  return (
    <div className="relative mx-auto grid min-h-screen w-full max-w-6xl grid-cols-2 items-start gap-8">
      <div className="p-8">{children}</div>

      <div className="h-full bg-zinc-800 p-8">
        <Image
          src={`/upload/${product.imageUrl}`}
          alt={product.name}
          width={400}
          height={400}
          className="mx-auto max-h-[300px] rounded-md md:max-h-[400px]"
        />
      </div>
    </div>
  );
}

const SingleProduct = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const [id, ..._slug] = params.id.split("-");
  const product = await singleProduct(Number(id));

  if (!product) {
    return notFound();
  }

  const ThemeComponent =
    {
      opta: ThemeA,
      optb: ThemeB,
      optc: ThemeC,
    }[product.theme] || ThemeB;

  return (
    <ThemeProvider attribute="class" forcedTheme="light">
      <ThemeComponent product={product}>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-sm text-gray-400">(250+ reviews)</span>
          </div>

          <p className="text-3xl font-bold">{formatCurrency(product.price)}</p>

          <p className="max-w-full whitespace-pre-line">
            {product.description}
          </p>

          <Button className="w-full">
            ¡Place order! <ArrowRight size={18} className="ml-4" />
          </Button>
        </div>
      </ThemeComponent>
    </ThemeProvider>
  );
};

export default SingleProduct;
