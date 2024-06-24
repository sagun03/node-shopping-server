import mongoose from "mongoose";

export class userAddressDTO{
    userId : string;
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;

    constructor(userId: string, street?: string, city?: string,
        country?: string, zipCode?: string) {
        this.userId = userId;
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
    }
}