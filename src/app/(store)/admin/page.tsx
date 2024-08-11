import { auth } from "@/lib/auth";

export default async function Admin() {
  const session = await auth();
  if (!session || !session.user) return null;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-muted p-8">
        <h1 className="text-xl">
          Welcome {session.user.name}, what a pleasure to have you again.
        </h1>
      </div>
    </div>
  );
}
