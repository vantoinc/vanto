import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/dialog";
import { Button } from "@/ui/shadcn/button";
import { FormStore } from "./form-store";

export function CreateStore(): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Create store</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Store</DialogTitle>
        </DialogHeader>

        <FormStore />
      </DialogContent>
    </Dialog>
  );
}
