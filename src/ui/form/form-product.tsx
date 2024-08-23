"use client";

import { Loader, Upload } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "../shadcn/radio-group";
import type { HookActionStatus } from "next-safe-action/hooks";
import type { Control } from "react-hook-form";
import { formProduct } from "@/lib/validations";
import { z } from "zod";
import { useRef } from "react";

interface Props {
  action: () => void;
  status: HookActionStatus;
  control: Control<z.infer<typeof formProduct>>;
  type?: "add" | "edit";
}

export function FormProduct({ action, status, control, type = "add" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={action} className="space-y-3">
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
              <Input className="mt-2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <FormField
          control={control}
          name="imageUrl"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <Button
                type="button"
                variant="secondary"
                onClick={() => inputRef.current?.click()}
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
          {type === "add" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
}
