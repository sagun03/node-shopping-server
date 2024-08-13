import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export function validateOrder<T extends ZodObject<any>>(schema: T) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
export function validateOrderId() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id; // Extract the 'id' parameter from the URL
    // Check if 'id' contains only digits
    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid URL." });
    }
    try {
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(400).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
