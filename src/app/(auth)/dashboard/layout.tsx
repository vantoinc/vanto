import Image from "next/image";
import { Profile } from "@/ui/common/profile";
import { Sidebar } from "@/ui/common/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-[260px_1fr]">
        <div className="sticky top-0 flex h-screen flex-col gap-2 overflow-y-auto bg-zinc-50 dark:bg-muted/40 p-6 border-r">
          <h1 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <Image src="/icon.png" alt="tilby" width={30} height={30} />
          </h1>

          <Sidebar />

          <Profile />
        </div>

        <div className="p-4">
          <div className="h-full rounded-xl p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
