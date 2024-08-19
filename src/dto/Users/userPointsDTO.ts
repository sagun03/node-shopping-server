/* eslint-disable max-params */
import mongoose from "mongoose";

export class userPointsDTO {
  userId: string;
  transactionType?: string;
  points?: number;
  userDescription?: string;
  date: Date;
  referralUserId?: mongoose.Types.ObjectId;
  reason?: string;

  constructor(
    userId: string,
    transactionType?: string,
    points?: number,
    userDescription?: string,
    referralUserId?: mongoose.Types.ObjectId,
    reason?: string,
  ) {
    this.userId = userId;
    this.points = points;
    this.transactionType = transactionType;
    this.userDescription = userDescription;
    this.date = new Date();
    this.referralUserId = referralUserId;
    this.reason = reason;
  }
}
