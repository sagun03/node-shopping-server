import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string(),
});

const sizeSchema = z.object({
  size: z.string().nonempty(),
  price: z.number().positive(),
  inStock: z.boolean(),
  images: z.array(z.string()),
});

export const productPostBodySchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  categoryId: z.string().optional(),
  category: z.string().nonempty(),
  sizes: z.array(sizeSchema).nonempty(),
  reviews: z.array(z.string()).optional(),
});
