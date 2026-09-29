import { acceptEnquiryService, getEnquiryService } from "../services/enquiryService.js"


export const acceptEnquiry =  async(req,res) =>{
    try {
       
        const data = await acceptEnquiryService(req.body)
        if(data == 'success'){
            res.status(201).json({
                success : true, 
                message : "Enquiry Submitted Successfully...",
                data : data
            })
        }
    } catch (error) {
        res.status(404).json({
            success : false,
            error : error.message
        })
    }
}


export const getEnquiry = async (req,res) =>{
    try {
    const getData =  await getEnquiryService()
    res.status(200).json({
        success : true,
        data : getData
    })
        
    } catch (error) {
        res.status(404).json({
            success : false,
            error : error.message
        })
    }
}