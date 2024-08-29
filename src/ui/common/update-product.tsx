"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  updateProduct,
  uploadImage,
} from "@/app/(auth)/dashboard/catalog/action";
import { CatalogContext } from "@/app/(auth)/dashboard/catalog/catalog-provider";
import { useAlert } from "@/lib/hooks";
import { formProduct } from "@/lib/validations";
import { FormProduct } from "@/ui/form/form-product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/dialog";
import { Form } from "@/ui/shadcn/form";

export function UpdateProduct(): JSX.Element {
  const { product, id, isEdit, setIsEdit } = useContext(CatalogContext);

  const form = useForm<z.infer<typeof formProduct>>({
    resolver: zodResolver(formProduct),
    defaultValues: product,
  });

  const { notice, warning } = useAlert();

  useEffect(() => {
    if (product) {
      form.reset(product);
    }
  }, [form, product]);

  const { executeAsync, status } = useAction(updateProduct.bind(null, id), {
    onSuccess: () => {
      notice("Product updated successfully");
      setIsEdit(false);
    },
    onError: () => {
      warning("there was an error the product could not be updated");
    },
  });

  const onSubmit = async (
    value: z.infer<typeof formProduct>,
  ): Promise<void> => {
    let imageUrl: string | undefined;

    if (value.imageUrl instanceof File) {
      const formData = new FormData();
      formData.append("image", value.imageUrl);
      imageUrl = await uploadImage(formData);
    } else if (typeof value.imageUrl === "string") {
      imageUrl = value.imageUrl;
    }

    const dataToSend = { ...value, imageUrl };

    if (imageUrl === undefined) {
      delete dataToSend.imageUrl;
    }

    await executeAsync(dataToSend);
  };

  return (
    <Dialog open={isEdit} onOpenChange={setIsEdit}>
      <DialogContent className="max-h-[calc(100vh-30px)] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <FormProduct
            action={form.handleSubmit(onSubmit)}
            control={form.control}
            status={status}
            type="edit"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
