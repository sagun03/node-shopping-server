import { z } from "zod";
const orderProductSchema = z.object({
  productID: z.string(),
  Quantity: z.number(),
  UnitPrice: z.number(),
  subTotal: z.number(),
});

export const orderSchema = z.object({
  userId: z.string(),
  PointsUsed: z.number(),
  TotalAmount: z.string(),
  DeliveryAddressID: z.number().nullable(),
  PaymentID: z.number().nullable(),
  Status: z.string(),
  Products: z.array(orderProductSchema),
});
