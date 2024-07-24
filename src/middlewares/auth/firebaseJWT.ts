import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import UserService from '../../services/users/userService';

// verify the firebase token
export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const refreshToken = req.headers.refreshtoken as string;
        if (!authHeader) {
            return res.status(401).send('Unauthorized no token provided');
        }
        if (!refreshToken) {
            return res.status(401).send('Unauthorized no refresh token provided');
        }
        const firebaseToken = authHeader.split(' ')[1];
        req.body.RFtoken = refreshToken.split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        next();
    } catch (error: any) {
        // check user runs out of session
        if (error.code === 'auth/id-token-expired') {
            const token: string = await extendSession(req.body.uid);
            if (token) {
                req.headers.authorization = `Bearer ${token}`;
            }
            next();
        } 
        return res.status(401).send({
            message: 'Unauthorized',
            error: error
        });
    }
};


// revoke refresh token
export const revokeRefreshToken = async(req: Request, res: Response, next: NextFunction) => {
    // find the user in the database
    console.log(req.body.uid);
    if(req.body.uid === undefined) {
        return res.status(400).send({
            message: 'uid not provided'
        })
    }
    UserService.getServiceInstance().getByUid(req.body.uid)
    .then(data => {
        // revoke the firebase refresh token
        admin.auth().revokeRefreshTokens(data.RFtoken as string);
        next();
    })
    .catch(error => {
        res.status(500).send({
            message: 'user not found',
            error: error
        })
    })
    next();
}

// extend session using RFtoken
async function extendSession(uid: string) : Promise<string> {
    return UserService.getServiceInstance().getByUid(uid)
    .then(user => {
        // call the firebase auth api to generate new IDtoken using RFtoken
        const baseURL = `https://securetoken.googleapis.com/v1/token?key=` + process.env.FIREBASE_API_KEY;
        const data = {
            grant_type: 'refresh_token',
            refresh_token: user.RFtoken
        }
        return fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // send the new IDtoken to the client
            return data.id_token;
        })
        .catch(error => {
            console.log('error extending session', error);
        })
    })
    .catch(error => {
        console.log('user not found');
    })
}