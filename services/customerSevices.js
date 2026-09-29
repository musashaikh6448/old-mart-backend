import CustomerModel from "../models/customerModel.js";

export const addCustomerNumber = async ({
  mobileNumber,
  customerName,
 
}) => {
 
  try {
    if (!mobileNumber || !customerName) {
      throw new Error("Mobile number and customer name are required.");
    }

    const newCustomer = new CustomerModel({
      mobileNumber,
      customerName,
     
    });

    await newCustomer.save();

    console.log("Customer added successfully:", newCustomer);

    return newCustomer;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error; // Re-throw the error for handling in the controller
  }
};

export const updateCustomerService = async (id, data) => {
  try {
    const updateCustomer = await CustomerModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateCustomer;
  } catch (error) {
    console.log(error.messsage);
  }
};

export const deleteCustomerService = async (id) => {
  try {
    const deleted = await CustomerModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log(error.messsage);
  }
};

export const customerDetailsService = async () => {
  try {
    const customeDetails = await CustomerModel.find();
    return customeDetails;
  } catch (error) {
    return error.messsage;
  }
};
