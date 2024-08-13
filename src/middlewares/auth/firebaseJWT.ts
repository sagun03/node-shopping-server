import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

// verify the firebase token
export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Unauthorized no token provided");
    }
    const firebaseToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    req.body.uid = decodedToken.uid;
    next();
  } catch (error: any) {
    return res.status(401).send({
      message: "Unauthorized",
      error: error,
    });
  }
};

// revoke refresh token
// export const revokeRefreshToken = async(req: Request, res: Response, next: NextFunction) => {
//     // find the user in the database
//     console.log(req.body.uid);
//     if(req.body.uid === undefined) {
//         return res.status(400).send({
//             message: 'uid not provided'
//         })
//     }
//     UserService.getServiceInstance().getByUid(req.body.uid)
//     .then(data => {
//         // revoke the firebase refresh token
//         admin.auth().revokeRefreshTokens(data.RFtoken as string);
//         next();
//     })
//     .catch(error => {
//         res.status(500).send({
//             message: 'user not found',
//             error: error
//         })
//     })
//     next();
// }
