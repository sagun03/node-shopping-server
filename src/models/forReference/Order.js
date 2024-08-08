/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
