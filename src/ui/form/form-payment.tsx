"use client";

import { formPayment } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/ui/shadcn/button";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";
import Stripe from "../common/stripe";
import { addPayment } from "@/app/(auth)/dashboard/settings/action";
import { useAction } from "next-safe-action/hooks";
import { useAlert } from "@/lib/hooks";

interface Props {
  data: {
    apiKey: string | null;
    privateKey: string | null;
    urlCallback: string | null;
  } | null;
}

export function FormPayment({ data }: Props): JSX.Element {
  const form = useForm<z.infer<typeof formPayment>>({
    resolver: zodResolver(formPayment),
    defaultValues: data || { apiKey: "", privateKey: "", urlCallback: "" },
  });

  const { notice, warning } = useAlert();

  const { execute, status } = useAction(addPayment, {
    onSuccess: () => {
      notice("settings saved successfully");
    },
    onError: () => {
      warning("There was an error saving settings");
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-2">
        <Stripe width={80} height={40} />
        <FormField
          control={form.control}
          name="urlCallback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook (optional)</FormLabel>
              <FormDescription>
                URL to receive payment event notifications.
              </FormDescription>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Api Key</FormLabel>
                <FormDescription>
                  Enter your production API key.
                </FormDescription>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privateKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Private Key</FormLabel>
                <FormDescription>
                  Enter your production private key.
                </FormDescription>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={status === "executing"}>
          {status === "executing" && (
            <Loader size={14} className="mr-1 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
