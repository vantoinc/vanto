"use client";

import { Button } from "@/ui/shadcn/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function AddVariant(): JSX.Element {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "Variant",
  });

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => append({ name: "", quantity: 0, price: 0 })}
      >
        <PlusCircle size={16} className="mr-1.5" />
        Add variants
      </Button>

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <FormField
              control={form.control}
              name={`Variant.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`Variant.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Quantity" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`Variant.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Price" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
