import { z } from "zod";

export const imageUploadSchema = z.object({
  file: z.instanceof(Buffer).refine((file) => file.byteLength > 0, {
    message: "File must not be empty",
  }),
  mimetype: z.enum(["image/jpeg", "image/png"]),
});
