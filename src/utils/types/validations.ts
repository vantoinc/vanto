import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().min(1),
  price: z
    .string()
    .min(1)
    .transform((val) => parseFloat(val)),
});
