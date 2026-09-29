import express from "express";
import { addOrder,getAllOrder,getOrderById1,deleteOrder,updateOrder,} from "../controllers/orderController.js";
import authenticateToken from "../authentication/userAuth.js";


let orderRoute=express.Router();
orderRoute.post("/saveOrder",addOrder);
orderRoute.get("/getAllOrders",authenticateToken,getAllOrder);
orderRoute.get("/getOrderById/:id",getOrderById1)
orderRoute.delete("/deleteOrderById/:id",authenticateToken,deleteOrder)
orderRoute.put("/updateOrderById/:id",authenticateToken,updateOrder)

export default orderRoute;
