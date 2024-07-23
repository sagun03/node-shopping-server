import { Request, Response, NextFunction } from 'express';
import { imageUploadSchema } from '../../schemas/Products/ProductsCategorySchema';

export const validateImageUpload = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { file } = req;
    const validationResult = imageUploadSchema.safeParse({
      file: file?.buffer,
      mimetype: file?.mimetype,
    });

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.errors });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
