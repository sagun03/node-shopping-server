import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// const REFRESH_SECRET = process.env.REFRESH_JWT_SECRET || 'your_jwt_secret';

type PayloadAuth = {
    username ?: string,
    password ?: string
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const generateToken = async (payload: PayloadAuth): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' }, (err, token) => {
            if(token) {
                resolve(token);
            } else {
                reject('Unable to generate token!');
            }
        })
    })
}

// export const generateRefreshToken = async (payload: PayloadAuth): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         jwt.sign(payload, REFRESH_SECRET, (err, token) => {
//             if(token) {
//                 resolve(token);
//             } else {
//                 reject('Unable to refresh token!');
//             }
//         })
//     })
// }

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            message: 'Token not found'
        })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message: 'Unauthorized access'
            })
        }
        req.user = decoded as JwtPayload;
        next();
    })
}