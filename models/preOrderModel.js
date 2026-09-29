import mongoose from "mongoose";

const preOrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    whichProductWantToPurchase: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    description: { type: String },
}, { timestamps: true });

const preOrderModel = mongoose.model('pre-orders', preOrderSchema);

export default preOrderModel;
