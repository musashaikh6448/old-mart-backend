import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "./models/userModel.js";

dotenv.config();

const addAdminUser = async () => {
  try {
    const dbUrl = process.env.DBURL;
    const dbName = process.env.DBNAME || "TekiskyMart-old";
    console.log("Connecting to Database...");
    await mongoose.connect(dbUrl, { dbName: dbName });
    console.log("Connected successfully!");

    const mobileNumber = "0000000000";
    const rawPassword = "tekisky123";
    const email = "admin@tekiskymart.com";

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const filter = { mobileNumber };
    const update = {
      firstName: "Admin",
      lastName: "Tekisky",
      mobileNumber: mobileNumber,
      email: email,
      password: hashedPassword,
      role: "superadmin",
      shopCategory: "Super Admin",
      shopName: "Tekisky Head Office",
      shopAddress: "Main HQ",
      GST: "N/A"
    };

    const adminUser = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });

    console.log("Admin user saved successfully:", {
      id: adminUser._id,
      mobileNumber: adminUser.mobileNumber,
      role: adminUser.role,
      email: adminUser.email,
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

addAdminUser();
