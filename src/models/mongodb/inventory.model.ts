import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: { type: Number, required: true, min: 0 },
  location: { type: String, required: true },
  status: { type: String, required: true, enum: ["in stock", "out of stock"] },
  offerId: { type: String, required: false }, //Array of String
});

const offerSchema = new mongoose.Schema({
  offerID: { type: String, required: true },
  code: { type: String, required: true },
  discountPercentage: { type: Number, required: true, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
const Offer = mongoose.model("Offer", offerSchema);

export { Inventory, Offer };
