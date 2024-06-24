import { z } from 'zod';

export const offerSchema = z.object({
  offerID: z.string().nonempty({ message: "OfferID is required" }),
  code: z.string().nonempty({ message: "Code is required" }),
  discountPercentage: z.number()
    .min(0, { message: "Discount percentage must be at least 0" })
    .max(100, { message: "Discount percentage must be at most 100" }),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string().optional()
}).refine(data => new Date(data.startDate) < new Date(data.endDate), {
  message: "Start date must be before end date",
  path: ['startDate', 'endDate']
});
