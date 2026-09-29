import {
  addCustomerNumberController,
  updateCustomer,
  deleteCustomer,
  getAllDetails,
} from "../controllers/customerController.js";
import express from "express";
import authenticateToken from "../authentication/userAuth.js";

let customerRoutes = express.Router();
import multer from "multer";
const upload = multer()

customerRoutes.post("/number", upload.single('file'),addCustomerNumberController);
customerRoutes.put("/update/:id", authenticateToken, updateCustomer);
customerRoutes.delete("/:id", authenticateToken, deleteCustomer);
customerRoutes.get("/allCustomerDetails", authenticateToken, getAllDetails);
export default customerRoutes;
