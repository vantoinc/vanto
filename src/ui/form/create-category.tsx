"use client";

import { useForm } from "react-hook-form";
import { Loader, Plus } from "lucide-react";
import { Button } from "@/ui/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/shadcn/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";
import { createCategory } from "@/app/(store)/manage/[id]/catalog/action";

type Category = { name: string };

export function CreateCategory(): JSX.Element {
  const form = useForm<Category>();

  async function onSubmit(values: Category): Promise<void> {
    await createCategory(values);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Plus size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" size="sm" onClick={form.handleSubmit(onSubmit)}>
            {form.formState.isSubmitting && (
              <Loader size={14} className="mr-1 animate-spin" />
            )}
            Save
          </Button>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
