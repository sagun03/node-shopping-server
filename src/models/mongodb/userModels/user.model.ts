import mongoose from 'mongoose';
import { userDTO } from '../../../dto/Users/userDTO';

// getting schema class from mongoose
const { Schema } = mongoose;

// creating user schema
const userSchema = new Schema({
    uid: {
        type: String,
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    pointsBalance: {
        type: Number,
        default: 500
    },
    referralCode: {
        type: String,
        default: null
    },
    referralUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    role: {
        type: String,
        required: true
    },
    RFtoken: {
        type: String,
        default: null
    }
})

// creating user model
const User = mongoose.model<userDTO>('User', userSchema);

export default User;