import aws from "aws-sdk";
import {
  addProductSerivce,
  dealOfTheDayService,
  getOneProductService,
  getProductService,
  productDeleteService,
  productUpdateService,
  getCategoriesService,
  getApprovedProductService,
} from "../services/productServices.js";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";
dotenv.config();

//AWS Upload Code
aws.config.update({
  accessKeyId: process.env.AWSS_OPEN_KEY,
  secretAccessKey: process.env.AWSS_SEC_KEY,
  region: process.env.AWSS_REGION,
});

const s3 = new aws.S3();

const uploadFile = async (file) => {
  // console.log('File Buffer:', file.buffer); // Log the file buffer
  const params = {
    Bucket: process.env.AWSS_BUCKET_NAME,
    Key: `images/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
  };
  // console.log('Upload Params:', params);
  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// createing prodact in DB
export const addProduct = async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      const imageProducts = await Promise.all(
        req.files.map((file) => uploadFile(file))
      );
      const uploadedImagesUrl = imageProducts.map((file) => file.Location);

      const status = await addProductSerivce(req.body, uploadedImagesUrl);

      if (status === "successfull") {
        res
          .status(201)
          .json({ success: true, message: "Successfully added product" });
      } else {
        throw new Error("Failed to add product");
      }
    } else {
      throw new Error("Please add an image");
    }
  } catch (error) {
    console.error("Error in controller adding product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get prodact services
export const getProduct = async (req, res) => {
  try {
    const products = await getProductService();
    res.status(200).json({ success: true, products: products }); // Sending status and products as an object
  } catch (error) {
    console.error("Error in getting products:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error in getting products" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(req.file)

    if (req.files && req.files.length > 0) {
      const fileUploads = await Promise.all(
        req.files.map((file) => uploadFile(file))
      );

      const uploadedFileUrls = fileUploads.map((file) => file.Location);

      updatedData.imageURL = uploadedFileUrls;
      
    }
    
    const updatedProduct = await productUpdateService(id, updatedData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in controller updating product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateProduct = await productDeleteService(id);
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const findProductsByMobileNumber = async (req, res) => {
  try {
    const createdBy = req.params.mobileNumber;

    // Use findOne if mobileNumber is not the document ID
    const products = await ProductModel.find({ createdBy });

    if (products) {
      // Send the found data as a JSON response
      res.status(200).json({ products, message: "Data found successfully" });
    } else {
      // Send a 404 response if no data is found
      res
        .status(404)
        .json({ message: "No data found for the provided mobile number" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Send a 500 response for internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const getOneProduct = await getOneProductService(id);

    res.status(200).json({ success: true, getOneProduct: getOneProduct });
  } catch (error) {
    console.log("error while getoneProduact catch block");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const dealOfTheDay = async (req, res) => {
  try {
    const getDealOfTheDay = await dealOfTheDayService();
    res.status(200).json({ success: true, DealOfTheDay: getDealOfTheDay });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getApprovedProduct = async (req, res) => {
  try {
    const approvedProduct = await getApprovedProductService();

    res.status(200).json({
      success: true,
      products: approvedProduct,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Error retrieving approved products",
    });
  }
};
