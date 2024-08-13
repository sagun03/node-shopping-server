import { z } from "zod";

export const categoryPostBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  imageURL: z.string(),
  productIds: z.array(z.string()).optional(),
});
