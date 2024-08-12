"use client";

import { formStore } from "@/types/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";
import { Textarea } from "@/ui/shadcn/textarea";
import { Button } from "../shadcn/button";
import { updateStoreProfile } from "@/app/(store)/dashboard/settings/action";
import { Loader } from "lucide-react";

export function FormStore({
  name,
  description,
  update = false,
}: {
  name?: string;
  description?: string;
  update?: boolean;
}): JSX.Element {
  const form = useForm<z.infer<typeof formStore>>({
    resolver: zodResolver(formStore),
    defaultValues: {
      name,
      description,
    },
  });

  async function onSubmit(values: z.infer<typeof formStore>): Promise<void> {
    if (update) {
      await updateStoreProfile(values);
      return;
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
                <FormControl>
                  <Input placeholder="store name" {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {form.formState.isSubmitting && (
              <Loader size={14} className="mr-1 animate-spin" />
            )}
            {update ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </>
  );
}
