import Image from "next/image";
import NextLogo from "@/assets/nextjs-logo.svg";
import Zod from "@/assets/zod.svg";
import Prisma from "@/assets/prisma.svg";
import Tailwindcss from "@/assets/tailwindcss.svg";
import Shadcn from "@/assets/shadcn.svg";
import React from "@/assets/react.svg";

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-6">
      <h1 className="text-center text-6xl">Open-Source Next.js Boilerplate</h1>

      <section className="flex items-center gap-6">
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
      </section>
    </main>
  );
}
