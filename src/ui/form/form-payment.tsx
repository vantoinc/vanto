"use client";

import { Payment } from "@/types/settings";
import { formPayment } from "@/types/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";
import { Button } from "@/ui/shadcn/button";
import { Checkbox } from "../shadcn/checkbox";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Textarea } from "../shadcn/textarea";
import { updatePayment } from "@/app/(store)/dashboard/settings/action";

interface Props {
  data: Payment[];
}

export function FormPayment({ data }: Props) {
  const paymentValues = () => {
    return {
      payment: data.map(
        ({ active, name, description, api_key, private_key }) => ({
          active,
          name,
          description,
          api_key,
          private_key,
        }),
      ),
    };
  };

  const form = useForm<z.infer<typeof formPayment>>({
    resolver: zodResolver(formPayment),
    defaultValues: paymentValues(),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "payment",
  });

  async function onSubmit(values: z.infer<typeof formPayment>) {
    await updatePayment(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn("border-2 border-dashed p-4", {
              "bg-muted": form.watch(`payment.${index}.active`),
            })}
          >
            <FormField
              control={form.control}
              name={`payment.${index}.active`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      {...field}
                      value={undefined}
                      className="mr-2"
                    />
                  </FormControl>
                  <FormLabel className="text-2xl">{data[index].name}</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`payment.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      disabled={!form.watch(`payment.${index}.active`)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name={`payment.${index}.api_key`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Api Key</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        disabled={!form.watch(`payment.${index}.active`)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`payment.${index}.private_key`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Private Key</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        disabled={!form.watch(`payment.${index}.active`)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button className="mt-2">
          {form.formState.isSubmitting && (
            <Loader size={14} className="mr-1 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
