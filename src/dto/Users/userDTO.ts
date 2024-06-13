import mongoose from "mongoose";

export class userDTO {
    userID ?: string;
    username: string;
    email: string;
    password: string;
    pointsBalance: number;
    referralCode : string;
    referralUserId : mongoose.Types.ObjectId;
    role: string;

    constructor(username: string, email: string, password: string,
        pointsBalance: number = 500, role: string = 'customer',
        referralCode: string = '000000', 
        referralUserId: mongoose.Types.ObjectId = 
        new mongoose.Types.ObjectId('000000000000000000000000')) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.pointsBalance = pointsBalance;
        this.role = role;
        this.referralCode = referralCode;
        this.referralUserId = referralUserId;
    }
}