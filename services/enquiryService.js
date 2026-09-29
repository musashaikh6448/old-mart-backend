import EnquiryModel from "../models/enquiryModel.js"


export const acceptEnquiryService = async(enquiryData) =>{
    try {
        const enquiry = await EnquiryModel(enquiryData)
        if(enquiry!=undefined||enquiry!=null){
            enquiry.save()
            return 'success'
        }else{
            throw new Error("data not saved in db");
        }

        
    } catch (error) {
        console.log(error.message)
    } 
}


export const getEnquiryService = async() =>{
    try {
        const enquiry = await EnquiryModel.find()
        return enquiry
    } catch (error) {
        console.log(error.message)
    }
}
