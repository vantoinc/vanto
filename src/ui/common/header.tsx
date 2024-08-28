import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Header(): JSX.Element {
  return (
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
  );
}
