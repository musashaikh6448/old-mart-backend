import { addProduct, deleteProduct, getProduct, updateProduct,getOneProduct,dealOfTheDay, getCategories, findProductsByMobileNumber,getApprovedProduct} from "../controllers/productController.js";
import  express from "express";
import multer, { memoryStorage } from "multer"
import authenticateToken from "../authentication/userAuth.js";
const upload = multer({ storage: multer.memoryStorage() });

const adminRoutes = express.Router()

//Protacted Routes 
adminRoutes.post('/addproduct',authenticateToken,upload.array('files',5),addProduct)
adminRoutes.get('/getproduct',authenticateToken,getProduct)
adminRoutes.put('/update/:id',upload.array('files',5),authenticateToken,updateProduct)
adminRoutes.get('/delete/:id',authenticateToken,deleteProduct)
// Public Routes
adminRoutes.get('/getoneproduct/:id',getOneProduct)
adminRoutes.get('/dealoftheday',dealOfTheDay)
adminRoutes.get('/getcategories',getCategories)
adminRoutes.get('/mobile/:mobileNumber', findProductsByMobileNumber)
adminRoutes.get('/approved',getApprovedProduct)

export default adminRoutes