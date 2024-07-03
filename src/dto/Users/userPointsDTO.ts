import mongoose from "mongoose";

export class userPointsDTO {
    userID: string;
    transactionType: string;
    points: number;
    userDescription: string;
    date: Date;
    referralUserId : mongoose.Types.ObjectId;
    reason : string;

    constructor(
        userID: string,
        transactionType: string,
        points: number,
        userDescription: string,
        referralUserId : mongoose.Types.ObjectId = new mongoose.Types.ObjectId('000000000000000000000000'),
        reason : string = ''
    ) {
        this.userID = userID;
        this.points = points;
        this.transactionType = transactionType;
        this.userDescription = userDescription;
        this.date = new Date();
        
        this.referralUserId = referralUserId ;
        this.reason = reason;
    }
}