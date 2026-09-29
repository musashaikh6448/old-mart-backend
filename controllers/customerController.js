import {
  addCustomerNumber,
  updateCustomerService,
  deleteCustomerService,
  customerDetailsService,
} from "../services/customerSevices.js";
import xlsx from "xlsx";

export const addCustomerNumberController = async (req, res) => {
  const { mobileNumber, customerName } = req.body;
  // console.log(req.body);
  try {
    if (!req.file) {
      await addCustomerNumber({
        mobileNumber,
        customerName,
      });
      return res
        .status(201)
        .json({ success: true, message: "Data added successfully" });
    }
    const workbook = xlsx.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
      const { mobileNumber, customerName } = row;
      if (mobileNumber == undefined || customerName == undefined) {
        break;
      }
      await addCustomerNumber({
        mobileNumber,
        customerName,
      });
    }

    res.status(200).json({ success: true, message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCustomer = await updateCustomerService(id, req.body);
    if (updateCustomer) {
      res.json({
        success: true,
        message: "update successfully",
        updateCustomer: updateCustomer,
      });
    } else {
      res.json({
        success: false,
        message: "error while updating",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCustomer = await deleteCustomerService(id);
    if (deletedCustomer) {
      res.json({
        success: true,
        message: "customer details deleted succssfull",
      });
    } else {
      res.json({
        success: false,
        message: "error while deleting customer details ",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllDetails = async (req, res) => {
  try {
    const customeDetails = await customerDetailsService();
    res.json({
      success: true,
      message: "retrvie successfull",
      customeDetails: customeDetails,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error while retrvie ${error.message} `,
    });
  }
};
