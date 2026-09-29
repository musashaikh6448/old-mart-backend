import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./models/productModel.js";

dotenv.config();

const sampleProducts = [
  {
    productId: `TekiskyMart:${Date.now()}_1`,
    header: "Electronics",
    productCategory: "Electronics",
    otherCategory: "Gadgets",
    productName: "Wireless Bluetooth Headphones Pro",
    productType: "Headphones",
    productBrand: "Tekisky Sound",
    availableStockQty: 50,
    mrp: 2999,
    offerPrice: 1499,
    packetweight: 250,
    unitOfMeasure: "g",
    description: "High-quality noise-canceling over-ear wireless Bluetooth headphones with deep bass.",
    createdBy: "9999999999",
    imageURL: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop"],
    manufactureDate: "2024-01-15",
    expiryDate: "2028-01-15",
    sellerInformation: "Tekisky Official Store",
    approved: true,
    dealOfDay: true,
    tekiskyPrice: "1499",
    color: "Black"
  },
  {
    productId: `TekiskyMart:${Date.now()}_2`,
    header: "Fashion",
    productCategory: "Clothing",
    otherCategory: "Men's Wear",
    productName: "Classic Cotton Casual T-Shirt",
    productType: "Shirt",
    productBrand: "Tekisky Threads",
    availableStockQty: 100,
    mrp: 999,
    offerPrice: 499,
    packetweight: 200,
    unitOfMeasure: "g",
    description: "100% breathable premium cotton T-shirt suitable for everyday wear.",
    createdBy: "9999999999",
    imageURL: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop"],
    manufactureDate: "2024-02-01",
    expiryDate: "N/A",
    sellerInformation: "Tekisky Fashion Hub",
    approved: true,
    dealOfDay: false,
    tekiskyPrice: "499",
    size: "L",
    color: "Navy Blue",
    material: "Cotton"
  },
  {
    productId: `TekiskyMart:${Date.now()}_3`,
    header: "Smartphones",
    productCategory: "Mobiles",
    otherCategory: "Smartphones",
    productName: "Tekisky Smart Watch Series X",
    productType: "Smartwatch",
    productBrand: "Tekisky Tech",
    availableStockQty: 30,
    mrp: 4999,
    offerPrice: 2499,
    packetweight: 150,
    unitOfMeasure: "g",
    description: "Smartwatch with HD Amoled display, Heart rate monitor, and 7-day battery backup.",
    createdBy: "9999999999",
    imageURL: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop"],
    manufactureDate: "2024-03-10",
    expiryDate: "2027-03-10",
    sellerInformation: "Tekisky Official Store",
    approved: true,
    dealOfDay: true,
    tekiskyPrice: "2499",
    color: "Space Grey"
  }
];

const seedDB = async () => {
  try {
    const dbUrl = process.env.DBURL;
    const dbName = process.env.DBNAME || "TekiskyMart-old";
    console.log("Connecting to Database...");
    await mongoose.connect(dbUrl, { dbName: dbName });
    console.log("Connected successfully!");

    const result = await ProductModel.insertMany(sampleProducts);
    console.log(`Successfully added ${result.length} sample products into DB!`);
    process.exit(0);
  } catch (error) {
    console.error("Error inserting sample products:", error);
    process.exit(1);
  }
};

seedDB();
