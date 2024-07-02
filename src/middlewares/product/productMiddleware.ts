import { Request, NextFunction, Response } from "express";
import { idParamSchema, productPostBodySchema } from "../../schemas/ProductMangementSchema/productSchema";
import { ZodError } from "zod";

const validateProductPostBody = (req: Request, res: Response, next: NextFunction) => {
        try {
            productPostBodySchema.parse(req.body);
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

const validateProductIdParam = ()  => {
    return (req: Request, res: Response, next: NextFunction) => {
     try { const id = req.params.id; 
      idParamSchema.parse(id);
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
  }
    export { validateProductPostBody, validateProductIdParam };
