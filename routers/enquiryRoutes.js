import express from 'express'
import { acceptEnquiry , getEnquiry} from '../controllers/enquiryController.js'
import authenticateToken from '../authentication/userAuth.js'

const enquiryRoutes = express.Router()

enquiryRoutes.post('/enquiry' , acceptEnquiry)
enquiryRoutes.get('/getEnquiry' , authenticateToken,getEnquiry)


export default enquiryRoutes