import mongoose from "mongoose";

export class userAddressDTO{
  uid : string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: number;

  constructor(
    uid: string,
    street?: string,
    city?: string,
    state?: string,
    pincode?: string,
    phone?: number
  ){
    this.uid = uid;
    this.street = street;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.phone = phone;
  }
}