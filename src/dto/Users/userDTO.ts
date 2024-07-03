import mongoose from "mongoose";

export class userDTO {
    userId ?: string;
    username: string;
    email: string;
    password: string;
    pointsBalance ?: number;
    referralCode ?: string;
    referralUserId ?: mongoose.Types.ObjectId;
    role ?: string;
<<<<<<< HEAD
    token ?: string;
=======
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

    constructor(username: string, email: string, password: string,
        pointsBalance ?: number, role ?: string,
        referralCode ?: string, 
        referralUserId ?: mongoose.Types.ObjectId) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.pointsBalance = pointsBalance;
        this.role = role;
        this.referralCode = referralCode;
        this.referralUserId = referralUserId;
    }
}