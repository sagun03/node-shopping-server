import mongoose from "mongoose";

export class userPointsDTO {
    userID: string;
    transactionType: string;
    points: number;
    userDescription: string;
    date ?: Date;
    referralUserId ?: mongoose.Types.ObjectId;
    reason ?: string;

    constructor(
        userID: string,
        transactionType: string,
        points: number,
        userDescription: string,
        referralUserId ?: mongoose.Types.ObjectId,
        reason ?: string) {
        this.userID = userID;
        this.points = points;
        this.transactionType = transactionType;
        this.userDescription = userDescription;
        
        if(arguments.length > 4) this.referralUserId = referralUserId ;
        if(arguments.length > 5) this.reason = reason;
    }
}