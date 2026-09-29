import mongoose from 'mongoose';


const productDetailsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  imageURL: { type: [String], required: true },
  packetweight: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true },
  description: { type: String, required: true },
  mrp: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  createdBy: { type: String, required: true },
  quantity:{ type: Number, required: true }
});


const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateNumber: { type: String },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true, },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  productDetails: [productDetailsSchema],
  orderStatus: {
    type: String,
    default: 'New Order',
    enum: ['New Order', 'order-verified', 'Dispatched', 'order-cancelled', 'Delivered'],
  },
  feedback: { type: String, trim: true },
}, {
  timestamps: true,
});

// Create an Order model based on the schema
const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
