import Image from "next/image";
import NextLogo from "@/assets/nextjs-logo.svg";
import Zod from "@/assets/zod.svg";
import Prisma from "@/assets/prisma.svg";
import Tailwindcss from "@/assets/tailwindcss.svg";
import Shadcn from "@/assets/shadcn.svg";
import React from "@/assets/react.svg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="relative">
        <div className="absolute -top-[110px] left-0 right-0 z-10 mx-auto h-[70px] w-full rounded-full bg-gradient-to-br from-blue-300 to-green-300 blur-[140px]"></div>
        <section className="mx-auto flex w-full max-w-5xl items-center justify-between py-4 backdrop-blur-sm">
          <h1 className="text-3xl font-bold">Logo</h1>

          <nav className="flex items-center gap-6 font-bold">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
          </nav>

          <Button>Get Started</Button>
        </section>

        <section className="mx-auto mt-28 flex max-w-xl flex-col items-center justify-center gap-6">
          <h1 className="text-center text-6xl">
            Open-Source Next.js Boilerplate
          </h1>
          <p className="text-zinc-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            vitae numquam deleniti, ullam, perspiciatis explicabo illum cum
            corporis
          </p>

          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 p-4">
              <Image src={React} alt="zod" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 p-4">
              <Image src={NextLogo} alt="nextjs" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 p-4">
              <Image src={Prisma} alt="prisma" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 p-4">
              <Image src={Zod} alt="zod" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 p-4">
              <Image src={Tailwindcss} alt="tailwindcss" />
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-900 p-4">
              <Image src={Shadcn} alt="shadcn" />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-44 flex w-full max-w-5xl flex-col gap-6 py-6">
          <div className="max-w-md">
            <h3 className="text-5xl font-bold">Features</h3>
            <p className="text-zinc-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-2 rounded-md border border-white/5 bg-zinc-800/20 p-6">
              <h4 className="text-2xl font-bold">Section 01</h4>
              <p className="text-balance text-zinc-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ad
                vitae.
              </p>
              <Button variant="outline">Get Started</Button>
            </div>
            <div className="space-y-2 rounded-md border border-white/5 bg-zinc-800/20 p-6">
              <h4 className="text-2xl font-bold">Section 01</h4>
              <p className="text-balance text-zinc-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ad
                vitae.
              </p>
              <Button variant="outline">Get Started</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl py-4 text-center">
        Built by{" "}
        <a href="https://x.com/BannedNull" className="font-bold">
          JssToni
        </a>{" "}
        Source code available on{" "}
        <a href="https://github.com/jsstoni/next-start" className="font-bold">
          GitHub
        </a>
        .
      </footer>
    </>
  );
}
