"use client";

import { removeProduct } from "@/app/dashboard/catalog/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  id?: number;
}

export function RemoveItem({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const handleRemove = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      return;
    }
    startTransition(async () => {
      await removeProduct(id);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full">
          Remove
        </Button>
      </DialogTrigger>
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
