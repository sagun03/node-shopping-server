import mongoose from "mongoose";

export class userDTO {
    uid ?: string;
    email: string;
    pointsBalance ?: number;
    referralCode ?: string;
    referralUserId ?: mongoose.Types.ObjectId;
    role ?: string;
    RFtoken ?: string;

    constructor(uid: string, email: string,
        RFToken ?: string, role ?: string,
        pointsBalance ?: number, referralCode ?: string, 
        referralUserId ?: mongoose.Types.ObjectId) {
        this.uid = uid;
        this.email = email;
        this.RFtoken = RFToken;
        this.pointsBalance = pointsBalance;
        this.role = role;
        this.referralCode = referralCode;
        this.referralUserId = referralUserId;
    }

}