import mongoose from 'mongoose';
import { userDTO } from '../../../dto/Users/userDTO';

// getting schema class from mongoose
const { Schema } = mongoose;

// creating user schema
const userSchema = new Schema({
    userID: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    pointsBalance: {
        type: Schema.Types.Mixed,
        default: Number
    },
    referralCode: {
        type: String
    },
    referralUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    role: {
        type: String,
        required: true
    }
})


// creating a userID if not sent through request body
// using mongoose pre-save hook
userSchema.pre('save', function(next){
    if(!this.userID) {
        this.userID = this._id.toString();
    }
    next();
})

// creating user model
const User = mongoose.model<userDTO>('User', userSchema);

export default User;