import mongoose from "mongoose";

const customerScehma = mongoose.Schema({
  customerName: { type: String, trim: true ,default:"unknown" },
  mobileNumber: { type: String, trim: true, required: true, },
  category: { type: String, trim: true,default:"customer" },
  knownField: { type: String, trim: true },
});

const CustomerModel = mongoose.model("customerNumbers", customerScehma);

export default CustomerModel;
