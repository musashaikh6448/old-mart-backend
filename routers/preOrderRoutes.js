
import express from 'express'
import { getPreOrder, preOrder } from '../controllers/preOrderController.js';
import authenticateToken from '../authentication/userAuth.js';
const preOrderRoutes = express.Router();



preOrderRoutes.post('/order', preOrder);

preOrderRoutes.get('/getPreOrders', authenticateToken,getPreOrder)

export default preOrderRoutes