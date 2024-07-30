import mongoose from "mongoose";

export class userDTO {
    uid ?: string;
    email: string;
    pointsBalance ?: number;
    referralCode ?: string;
    referralUserId ?: mongoose.Types.ObjectId;
    role ?: string;

    constructor(uid: string, email: string, role ?: string,
        pointsBalance ?: number, referralCode ?: string, 
        referralUserId ?: mongoose.Types.ObjectId) {
        this.uid = uid;
        this.email = email;
        this.pointsBalance = pointsBalance;
        this.role = role;
        this.referralCode = referralCode;
        this.referralUserId = referralUserId;
    }

}