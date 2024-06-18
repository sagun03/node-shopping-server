import mongoose from 'mongoose';
import { userPointsDTO } from '../../../dto/Users/userPointsDTO';

// getting schema class from mongoose
const { Schema } = mongoose;

// creating userPoints schema
const userPointsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        requried: true
    },
    userDesctiption: {
        type: String
    },
    date: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    referralUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    reason: {
        type: String,
        default: null
    }
})

// creating userPoints model
const userPoints = mongoose.model<userPointsDTO>('UserPoints', userPointsSchema);

export default userPoints;