import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import { dbConnect } from "./db/dbConnect.js"
import orderRoute from "./routers/orderRouter.js";
import adminRoutes from "./routers/productRoutes.js"
import userRoutes from "./routers/userRoutes.js";
import enquiryRoutes from "./routers/enquiryRoutes.js";
import preOrderRoutes from "./routers/preOrderRoutes.js";
import customerRoutes from "./routers/customerRoutes.js";

dotenv.config();
const corsOptions = {
  origin: '*', // Replace with the origin(s) you want to allow
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};


// Enable CORS for all routes
const app = express()
app.use(cors(corsOptions))
app.use(morgan('tiny'))

let dburl = process.env.DBURL
let dbname = process.env.DBNAME
const port = process.env.PORT
dbConnect(dburl, dbname)

app.use(express.json())

 
app.use('/client', enquiryRoutes)
app.use("/order", orderRoute)
app.use("/product", adminRoutes)
app.use('/user', userRoutes)
app.use('/pre', preOrderRoutes)
app.use('/customer',customerRoutes)

app.listen(port, () => {
  console.log(`server started at port number  ${port}`)
})