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
    <main className="relative">
      <div className="absolute -top-[110px] left-0 right-0 z-10 mx-auto h-[70px] w-full rounded-full bg-gradient-to-br from-blue-300 to-green-300 blur-[140px]"></div>
      <section className="py-4 backdrop-blur-sm flex items-center justify-between w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Logo</h1>

        <nav className="flex items-center gap-6 font-bold">
          <a href="#">Feactures</a>
          <a href="#">Pricing</a>
        </nav>

        <Button>Get Started</Button>
      </section>

      <section className="max-w-xl mx-auto flex flex-col justify-center items-center gap-6 mt-28">
        <h1 className="text-center text-6xl">Open-Source Next.js Boilerplate</h1>
        <p className="text-zinc-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur vitae numquam deleniti, ullam, perspiciatis explicabo illum cum corporis</p>

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
    </main>
  );
}
