import { ThemeProvider } from "next-themes";

import { Logo } from "@/ui/common/logo";
import { Profile } from "@/ui/common/profile";
import { Sidebar } from "@/ui/common/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div className="grid min-h-screen w-full grid-cols-[260px_1fr]">
        <div className="sticky top-0 flex h-screen flex-col gap-2 overflow-y-auto rounded-r-2xl border-r bg-zinc-50 p-4 dark:bg-muted/40">
          <h1 className="my-4 flex items-center px-2 text-xl font-bold">
            <Logo /> anto
          </h1>

          <Sidebar />

          <Profile />
        </div>

        <div className="p-4">
          <div className="h-full rounded-xl p-4">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
