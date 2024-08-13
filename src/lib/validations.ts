import { z } from "zod";

const typePrice = z.union([
  z
    .string()
    .min(1)
    .transform((val) => parseFloat(val)),
  z.number().min(1),
]);

const typeNumber = z.union([
  z
    .string()
    .min(1)
    .transform((val) => Number(val)),
  z.number().min(1),
]);

export const formProduct = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().min(1),
  price: typePrice,
  categoryId: typeNumber.nullable().optional(),
  variants: z.array(
    z.object({
      name: z.string().min(1),
      quantity: typeNumber,
      price: typePrice,
    }),
  ),
});

export const formPayment = z.object({
  name: z.enum(["Stripe", "Paypal"]),
  description: z.string().optional(),
  apiKey: z.string().optional(),
  privateKey: z.string().optional(),
  urlCallback: z.string().optional(),
});
