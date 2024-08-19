// middleware/inventoryMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { inventorySchema } from "../../schemas/InventoryManagement/InventorySchema";

// Middleware function to validate inventory data against inventorySchema
export function validateInventoryData() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate req.body against the inventorySchema
      inventorySchema.parse(req.body);
      next();
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} ${issue.message}`,
        }));
        res
          .status(400)
          .json({ error: "Invalid inventory data", details: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}

// Middleware function to validate inventory ID (in params)
export function validateInventoryId() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id; // Extract the 'id' parameter from the URL

    // Check if 'id' contains only digits
    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid inventory ID format" });
    }

    // Continue to next middleware or route handler
    next();
  };
}
