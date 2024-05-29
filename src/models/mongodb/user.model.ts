import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        lowercase: true
    },
    Password: {
        type: String,
        required: true,
    },
    PointsBalance: {
        type: Number
    },
    ReferralCode: {
        type: String
    },
    ReferralUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Role: {
        type: String,
        required: true
    }
})

const UserPointsSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    TransactionType: {
        type: String,
        required: true
    },
    Points: {
        type: Number,
        requried: true
    },
    UserDesctiption: {
        type: String
    },
    Date: {
        type: Date,
        default: () => new Date(),
        immutable: true
    },
    ReferralUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    RedeemedAt: {
        type: Date
    },
    Reason: {
        type: String
    }
})

const AddressSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Street: {
        type: String
    },
    City: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    PostalCode: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
const UserPoints = mongoose.model('UserPoints', UserPointsSchema);
const Address = mongoose.model('Address', AddressSchema);

export {User, UserPoints, Address}