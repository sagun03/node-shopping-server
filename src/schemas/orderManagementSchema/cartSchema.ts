import { z } from "zod";
const cartProductSchema = z.object({
  productID: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  size: z.string(),
});

export const cartSchema = z.object({
  userId: z.string(),
  Products: z.array(cartProductSchema),
});
