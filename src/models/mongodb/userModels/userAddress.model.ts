import mongoose from "mongoose";
import { userAddressDTO } from "../../../dto/Users/userAddressDTO";

// getting schema class from mongoose
const { Schema } = mongoose;

// creating userAddress schema
const userAddressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

// creating userAddress model
const userAddress = mongoose.model<userAddressDTO>(
  "UserAddress",
  userAddressSchema,
);

export default userAddress;
