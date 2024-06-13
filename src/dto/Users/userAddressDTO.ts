import mongoose from "mongoose";

export class userAddressDTO{
    userID : mongoose.Types.ObjectId;
    street: string;
    city: string;
    country: string;
    postalCode: string;

    constructor(userID: mongoose.Types.ObjectId, street: string, city: string,
        country: string, postalCode: string) {
        this.userID = userID;
        this.street = street;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
    }
}