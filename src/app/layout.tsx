import "@/types/env";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Provider from "@/lib/provider";
import { Toaster } from "@/ui/shadcn/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tilby",
  description: "Inventory Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
