import { Logo } from "@/ui/common/logo";
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
        <div className="sticky top-0 flex h-screen flex-col gap-2 overflow-y-auto border-r bg-zinc-50 p-6 dark:bg-muted/40">
          <h1 className="mb-6 flex items-center text-xl font-bold">
            <Logo /> anto
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
