"use client";

import { Loader, Upload } from "lucide-react";
import type { HookActionStatus } from "next-safe-action/hooks";
import { useRef } from "react";
import type { Control } from "react-hook-form";
import type { z } from "zod";

import type { formProduct } from "@/lib/validations";
import { AddVariant } from "@/ui/common/add-variant";
import { Button } from "@/ui/shadcn/button";
import { DialogClose } from "@/ui/shadcn/dialog";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/form";
import { Input } from "../shadcn/input";
import { Textarea } from "../shadcn/textarea";
import { OptionA } from "../skeleton/option-a";
import { OptionB } from "../skeleton/option-b";
import { OptionC } from "../skeleton/option-c";

interface Props {
  action: () => void;
  status: HookActionStatus;
  control: Control<z.infer<typeof formProduct>>;
  type?: "add" | "edit";
}

export function FormProduct({
  action,
  status,
  control,
  type = "add",
}: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={action} className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <FormField
          control={control}
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
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormDescription className="text-xs">
                Give your product a short and clear description.
              </FormDescription>
              <FormControl>
                <Textarea className="mt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
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
            control={control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
            {type === "add" ? "Create" : "Update"}
          </Button>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <OptionB />
          <OptionA />
          <OptionC />
        </div>

        <div>
          <FormField
            control={control}
            name="imageUrl"
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => inputRef.current?.click()}
                  className="mb-2"
                >
                  <Upload size={16} className="mr-1.5" /> Upload Image
                </Button>
                <FormDescription className="text-xs">
                  JPEG, PNG or WEBP under 2MB.
                </FormDescription>
                <FormControl>
                  <Input
                    {...fieldProps}
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    value=""
                    onChange={(event) => {
                      onChange(event.target?.files?.[0] ?? undefined);
                    }}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </form>
  );
}
