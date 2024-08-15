"use client";

import { Button } from "@/ui/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/dialog";
import { Input } from "@/ui/shadcn/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/form";
import { createProduct } from "@/app/(store)/manage/catalog/action";
import { formProduct } from "@/lib/validations";
import { Loader, PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddVariant } from "@/ui/common/add-variant";
import { RadioGroup, RadioGroupItem } from "../shadcn/radio-group";
import { useAction } from "next-safe-action/hooks";

export function CreateProduct(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formProduct>>({
    resolver: zodResolver(formProduct),
  });

  const handleOpen = (): void => {
    form.reset();
    setOpen(true);
  };

  const { execute, status } = useAction(createProduct, {
    onSuccess: () => {
      alert("test create");
      setOpen(false);
    },
    onError: () => {
      alert("Error");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={handleOpen} className="w-full">
          <PlusCircle size={16} className="mr-1" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-30px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(execute)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormDescription className="text-xs">
                    Give your product a short and clear name.
                  </FormDescription>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormDescription className="text-xs">
                    Give your product a short and clear description.
                  </FormDescription>
                  <FormControl>
                    <Input className="mt-2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billing"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="one" />
                          </FormControl>
                          <FormLabel>Single payment</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="subs" />
                          </FormControl>
                          <FormLabel>Subscription</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AddVariant />

            <div className="flex items-center gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={status === "executing"}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={status === "executing"}>
                {status === "executing" && (
                  <Loader size={14} className="mr-1 animate-spin" />
                )}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
