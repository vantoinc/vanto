import { auth } from "@/lib/auth";
import { CreateStore } from "@/ui/form/create-store";

export default async function Admin(): Promise<JSX.Element | null> {
  const session = await auth();
  if (!session || !session.user) return null;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-muted p-8">
        <h1 className="mb-2 text-xl">
          Welcome {session.user.name}, what a pleasure to have you again.
        </h1>

        <CreateStore />
      </div>
    </div>
  );
}
