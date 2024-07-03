// validations for address routes
import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { messageDTO } from '../../dto/messageDTO';
import { instanceToPlain } from 'class-transformer';

// address schema for validation
export const addressSchema = z.object({
    zipCode: z.string().regex(/^[A-Z\d]{6}$/, "Invalid ZIP code"),
});

// middleware for validation
export const validateAddress = (schema : z.ZodSchema) => (req : Request, res : Response, next : NextFunction) => {
    try {
        const reqBody = req.body;
        schema.parse({
            zipCode: reqBody.zipCode
        })
        next();
    } catch(error) {
        if(error instanceof ZodError){
            let message = instanceToPlain(new messageDTO(400, "validations failed!", error.errors));
            res.status(message.status).send(message);
        }
        next(error);
    }
}



