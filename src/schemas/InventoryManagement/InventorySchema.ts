// schemas/inventorySchema.ts
import { z } from 'zod';

// Define the Zod schema for inventory data
export const inventorySchema = z.object({
  productID: z.string().refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
    message: 'Invalid productID format'
  }),
  quantity: z.number().min(0, { message: 'Quantity must be at least 0' }),
  location: z.string().nonempty({ message: 'Location is required' }),
  status: z.enum(['in stock', 'out of stock'], { message: "Status must be either 'in stock' or 'out of stock'" }),
  offerId: z.string().optional(),
});
