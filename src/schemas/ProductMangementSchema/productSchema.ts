import { z } from 'zod';

export const idParamSchema = z.object({
    id: z.string(),
});

export const productPostBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    categoryId: z.string(),
    imageURL: z.string(),
    reviews: z.array(z.string()).optional(),
  });
  