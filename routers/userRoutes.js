import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  updateUserById,
  deleteUser,
  getOneUser,
} from "../controllers/userController.js";
import authenticateToken from "../authentication/userAuth.js";
import { logoutUserController } from "../controllers/orderController.js";

const userRoutes = express.Router();

userRoutes.post("/createUser", authenticateToken, createUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/updateUser/:id", authenticateToken, updateUserById);
userRoutes.get("/getUsers", authenticateToken, getUsers);
userRoutes.get("/deleteUser/:id", authenticateToken, deleteUser);
userRoutes.get("/getOneUser/:id", authenticateToken, getOneUser);
userRoutes.get("/logout",authenticateToken,logoutUserController)

export default userRoutes;
