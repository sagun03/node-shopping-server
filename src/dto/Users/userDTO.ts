import mongoose from "mongoose";

export class userDTO {
    userID ?: string;
    username : string;
    email : string;
    password : string;
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
        if (arguments.length > 3) this.pointsBalance = pointsBalance;
        if (arguments.length > 4) this.role = role;
        if (arguments.length > 5) this.referralCode = referralCode;
        if (arguments.length > 6) this.referralUserId = referralUserId;
    }
}