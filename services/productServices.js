
import ProductModel from "../models/productModel.js";


const generateProductId = () => {
    try {
        const now = new Date();
        const year = String(now.getFullYear()).slice(-2);
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0')

        const tekiskyMart = 'TekiskyMart:';
        const orderId = `${tekiskyMart}${year}${hour}${second}`;

        return orderId;
    } catch (error) {
        throw new Error("Failed to generate order ID: " + error.message);
    }
};



export const addProductSerivce = async (data, imageUrl) => {
    const productId = await generateProductId();
    try {
        const newProduct = new ProductModel({ ...data, imageURL: imageUrl, productId: productId });

        const savedProduct = await newProduct.save();
        console.log(savedProduct)
        return 'successfull';
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation error:", error.message);
            throw new Error("Validation error");
        } else {
            console.error("Error adding product:", error);
            throw new Error("Failed to add product");
        }
    }
};



// Assuming this file is productServices.js


export const getProductService = async () => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.find();
        // const {availableStockQty} = products
        //console.log(availableStockQt)


        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in fetching products:', error);
        throw new Error('Error in fetching products');
    }
};

export const productUpdateService = async (id, updatedData) => {
    try {
        // Update a product in the database using Mongoose
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );
        return updatedProduct; // Return the updated product
    } catch (error) {
        // Handle any errors that occur during the update
        console.error('Error in updating the product:', error);
        throw new Error('Error in updating the product');
    }
};


export const productDeleteService = async (id) => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.findByIdAndDelete({ _id: id });
        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in deleting the  products:', error);
        throw new Error('Error in deleting products');
    }
};




export const getOneProductService = async (productId) => {
    try {
        const product = await ProductModel.findOne({ _id: productId }).exec();

        if (!product) {
            console.error(`Product not found for the given ID: ${productId}`);
            return null; // Return null or an empty object
        }

        return product;
    } catch (error) {
        console.error('Error while getting product:', error);
        throw error; // Re-throw the error to propagate it
    }
};


export const dealOfTheDayService = async () => {
    try {
        const dealProduct = await ProductModel.findOne({ dealOfDay: true })
        return dealProduct
    } catch (error) {
        console.error('Error while getting dealProduct:', error);
        throw error; // Re-throw the error to propagate it
    }



}

export const getCategoriesService = async () => {
    try {
        const categories = await ProductModel.aggregate([
            { $group: { _id: "$productCategory" } },
            { $project: { _id: 0, category: "$_id" } }
        ]);

        return categories.map(category => category.category);
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Rethrow the error for handling in the calling code
    }
};


export const getApprovedProductService = async () => {
    try {
        let approvedProducts = await ProductModel.find({ approved: true });
        if (!approvedProducts || approvedProducts.length === 0) {
            approvedProducts = await ProductModel.find();
        }
        return approvedProducts;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
