import mongoose from "mongoose";

export class userDTO {
    userID ?: string;
    username: string;
    email: string;
    password: string;
    pointsBalance ?: number;
    referralCode ?: string;
    referralUserId ?: mongoose.Types.ObjectId;
    role ?: string;

    constructor(username: string, email: string, password: string,
        pointsBalance ?: number, role ?: string,
        referralCode ?: string, 
        referralUserId ?: mongoose.Types.ObjectId) {
        this.username = username;
        this.email = email;
        this.password = password;
        if(pointsBalance !== undefined) this.pointsBalance = pointsBalance;
        if(role !== undefined) this.role = role;
        if(referralCode !== undefined) this.referralCode = referralCode;
        if(referralUserId !== undefined) this.referralUserId = referralUserId;
    }
}