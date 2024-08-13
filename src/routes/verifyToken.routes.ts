/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

const verifyFirebaseToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.token as string;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC as string, (err: any, user: any) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyFirebaseTokenAndAuthorization = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyFirebaseTokenAndAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  verifyFirebaseToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

export {
  verifyFirebaseToken,
  verifyFirebaseTokenAndAuthorization,
  verifyFirebaseTokenAndAdmin,
};
