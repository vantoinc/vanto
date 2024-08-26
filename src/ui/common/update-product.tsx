"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/ui/shadcn/form";
import {
  updateProduct,
  uploadImage,
} from "@/app/(auth)/dashboard/catalog/action";
import { formProduct } from "@/lib/validations";
import { useAction } from "next-safe-action/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/shadcn/dialog";
import { useContext, useEffect } from "react";
import { CatalogContext } from "@/app/(auth)/dashboard/catalog/catalog-provider";
import { useAlert } from "@/lib/hooks";
import { FormProduct } from "@/ui/form/form-product";

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

  const onSubmit = async (value: z.infer<typeof formProduct>) => {
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
      <DialogContent>
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
