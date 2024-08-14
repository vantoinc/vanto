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
  price: typePrice,
  Variant: z.array(
    z.object({
      name: z.string().min(1),
      quantity: typeNumber,
      price: typePrice,
    }),
  ),
});

export const formPayment = z.object({
  apiKey: z.string().min(1).nullable(),
  privateKey: z.string().min(1).nullable(),
  urlCallback: z.string().nullable(),
});
