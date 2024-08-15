"use client";

import { removeProduct } from "@/app/(store)/manage/catalog/action";
import { CatalogContext } from "@/app/(store)/manage/catalog/catalog-provider";
import { Button } from "@/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { useContext, useTransition } from "react";

export function RemoveItem(): JSX.Element {
  const { isRemove, setIsRemove, id } = useContext(CatalogContext);

  const [isPending, startTransition] = useTransition();

  const handleRemove = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (!id) {
      return;
    }
    startTransition(async () => {
      await removeProduct(id);
      setIsRemove(false);
    });
  };

  return (
    <Dialog open={isRemove} onOpenChange={setIsRemove}>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Do you want to delete product?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={handleRemove} className="space-x-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              disabled={isPending}
            >
              {isPending && <Loader size={14} className="mr-1 animate-spin" />}
              Remove
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
