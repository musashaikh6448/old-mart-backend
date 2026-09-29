import mongoose from 'mongoose';
import { stringify } from 'querystring';


const enquirySchema = new mongoose.Schema({
    shopSellerName:{
        type : String,
        required : true
    },
    doYouHaveGST : {
        type : Boolean,
        required : true
    },
    GST : {
        type : String
    },
    doYouHaveShop : {
        type : Boolean,
        required : true
    },
    shopName : {
        type : String,
    },
    productDetails : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String,
        required : true,
    },
    whichProductYouHaveToSell : {
        type : String,
        required : true
    },


},{ timestamps: true })


const EnquiryModel = mongoose.model("enquiry" , enquirySchema)

export default EnquiryModel