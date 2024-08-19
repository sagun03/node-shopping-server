import mongoose from "mongoose";
import { userAddressDTO } from "../../../dto/Users/userAddressDTO";

// getting schema class from mongoose
const { Schema } = mongoose;

// creating userAddress schema
const userAddressSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

// creating userAddress model
const userAddress = mongoose.model<userAddressDTO>(
  "UserAddress",
  userAddressSchema,
);

export default userAddress;
