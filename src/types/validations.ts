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

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().min(1),
  price: typePrice,
  variants: z.array(
    z.object({
      name: z.string().min(1),
      quantity: typeNumber,
      price: typePrice,
    }),
  ),
});

export const formStore = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
