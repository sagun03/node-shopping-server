import mongoose from 'mongoose';
import { userDTO } from '../../../dto/Users/userDTO';

// getting schema class from mongoose
const { Schema } = mongoose;

// creating user schema
const userSchema = new Schema({
    userId: {
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
        required: true,
        default: 'customer'
    }
})


// creating a userID if not sent through request body
// using mongoose pre-save hook
userSchema.pre('save', function(next){
    if(!this.userId) {
        this.userId = this._id.toString();
    }
    next();
})

// creating user model
const User = mongoose.model<userDTO>('User', userSchema);

export default User;