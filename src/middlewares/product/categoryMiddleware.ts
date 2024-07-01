import { Request, NextFunction, Response } from "express";
import { idParamSchema } from "../../schemas/ProductMangementSchema/productSchema";
import { categoryPostBodySchema } from "../../schemas/ProductMangementSchema/categorySchema";
import { ZodError } from "zod";


const validateCategoryIdParam = (req: Request, res: Response, next: NextFunction) => {
    try {
      idParamSchema.parse(req.params);
      next();
    } catch (error) {
        if (error instanceof ZodError
            ) {
        const errorMessages = error.errors.map((issue: any) => ({
              message: `${issue.path.join('.')} is ${issue.message}`,
          }))
          res.status(400).json({ error: 'Invalid data', details: errorMessages });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
  };
  
  const validateCategoryPostBody = (req: Request, res: Response, next: NextFunction) => {
    try {
      categoryPostBodySchema.parse(req.body);
      next();
    } catch (error) {
        if (error instanceof ZodError) {
          const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} ${issue.message}`,
          }));
          res.status(400).json({ error: 'Invalid  Id', details: errorMessages });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
  };
  
  export { validateCategoryIdParam, validateCategoryPostBody };