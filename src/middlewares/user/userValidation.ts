// validations for user routes
import { Request, Response, NextFunction } from 'express';
import { ZodError, z } from 'zod';
import { messageDTO } from '../../dto/messageDTO';
import { instanceToPlain } from 'class-transformer';

// user schema for validation
export const User = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password requirements
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
})

// middleware for validation
export const validateUser = (schema : z.ZodSchema) => (req : Request, res : Response, next : NextFunction) => {
    try {
        const reqBody = req.body;
        schema.parse({
            username: reqBody.username,
            email: reqBody.email,
            password: reqBody.password
        })
        next();
    } catch(error) {
        if(error instanceof ZodError){
            let message = instanceToPlain(new messageDTO(400, 'validations failed!', error.errors));
            res.status(message.status).send(message);
        }
        next(error);
    }
}



